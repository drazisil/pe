import { open } from "node:fs/promises";
import { u32 } from "./u32";
import { PEHeader } from "./PEHeader";
import { u16 } from "./u16";
import { OptionalHeader } from "./OptionalHeader";
import { OptionalHeaderDataDirectories } from "./OptionalHeaderDataDirectories";
import { SectionTable } from "./SectionTable";
import { decodeInstruction } from "./instructionMap";
import { decodeModRM_32, decodeMod_32, isOpcodeWithModRM } from "./registerNumberMap";
import { u8 } from "./u8";
import { ECharacteristics } from "./Characteristics";

export class PE {
  private readonly peHeader: PEHeader;
  private readonly optionalHeader: OptionalHeader;
  private readonly optionalHeaderDataDirectories: OptionalHeaderDataDirectories;
  private readonly sectionTables: SectionTable[];
  private readonly sections: { [key: string]: Uint8Array };
  private wordSize = -1;
  private instructionPointer = -1;
  private lastInstructionPointer = 0; 
  private instruction = -1;
  private lastInstruction = -1;
  private address = -1;

  constructor(
    peHeader: PEHeader,
    optionalHeader: OptionalHeader,
    optionalHeaderDataDirectories: OptionalHeaderDataDirectories,
    sectionTables: SectionTable[],
    sections: { [key: string]: Uint8Array }
  ) {
    this.peHeader = peHeader;
    this.optionalHeader = optionalHeader;
    this.optionalHeaderDataDirectories = optionalHeaderDataDirectories;
    this.sectionTables = sectionTables;
    this.sections = sections;
  }

  /**
   * Fetches the next instruction from the code section.
   * If the end of the code section is reached, an error is thrown.
   */
  fetchInstruction() {
    if (this.instructionPointer >= this.sections[".text"].length) {
      throw new Error("End of code section reached");
    }

    this.lastInstructionPointer = this.instructionPointer;
    this.instruction = this.sections[".text"][this.instructionPointer];
    this.instructionPointer++;

    console.log(`Instruction: 0x${this.instruction.toString(16)}`);
  }

  /**
   * Executes the program by running the instructions in the code section.
   * Throws an error if the word size is not set or if the code section is not found.
   * Prints the instruction pointer and the decoded instruction for each executed instruction.
   * Stops execution if an infinite loop is detected.
   */
  public async run() {
    if (this.wordSize === -1) {
      throw new Error("Word size not set");
    }

    const codeSection = this.sections[".text"];

    if (!codeSection) {
      throw new Error("Code section not found");
    }

    this.instructionPointer = 0;

    while (true) {

      this.fetchInstruction();

      let instruction = this.instruction;

      console.log(
        `0x${this.instructionPointer.toString(16)}: 0x${Math.abs(
          instruction
        ).toString(16)}`
      );

      const instructionString = decodeInstruction(this.instruction);

      if (this.instructionPointer === this.lastInstructionPointer) {
        console.log(
          `Infinite loop detected at 0x${this.instructionPointer.toString(16)}`
        );
        break;
      }

      if (isOpcodeWithModRM(this.instruction)) {
        this.fetchInstruction()
        const modRM = this.instruction;
        console.log(`ModRM: ${modRM}`);

        if (decodeMod_32(modRM) === "mod: Register + Displacement Byte") {
          const displacement = u32(codeSection, this.instructionPointer);
          console.log(`Displacement: 0x${displacement.toString(16)}`);
          this.instructionPointer += 1;
        }

        console.log(decodeModRM_32(modRM));
        continue
      }

      if (instructionString.includes(",")) {
        const [instructionName, operand] = instructionString.split(",");
        console.log(instructionName, operand);

        if (operand.includes("m32")) {
          const address = u32(codeSection, this.instructionPointer);
          console.log(`Address: 0x${address.toString(16)}`);
          this.instructionPointer += 4;
        }
      }

      console.log(instructionString);
      this.lastInstructionPointer = this.instructionPointer;
      console.log();
    }
  }

  static async fromPath(path: string) {
    const fd = await open(path, "r");
    const fileSize = (await fd.stat()).size;
    const data = new Uint8Array(fileSize);
    const bytesRead = await fd.read(data, 0, fileSize, 0);
    const pointerToPEHeaderStart = u32(data, 60);
    const peHeader = new PEHeader(data, pointerToPEHeaderStart);

    const optionalHeaderMagic = u16(
      data,
      pointerToPEHeaderStart + peHeader.size
    );
    const optionalHeader = new OptionalHeader(
      data,
      pointerToPEHeaderStart + peHeader.size
    );
    const optionalHeaderDataDirectories = new OptionalHeaderDataDirectories(
      data,
      pointerToPEHeaderStart + peHeader.size + optionalHeader.size
    );
    const sectionTables: SectionTable[] = [];
    const sectionTableStart =
      pointerToPEHeaderStart + peHeader.size + peHeader.sizeOfOptionalHeader;
    for (let i = 0; i < peHeader.numberOfSections; i++) {
      const sectionTable = new SectionTable(data, sectionTableStart + i * 40);
      sectionTables.push(sectionTable);
    }
    const sections: { [key: string]: Uint8Array } = {};
    for (const sectionTable of sectionTables) {
      const sectionName = sectionTable.name.replace(/\\00/g, "");
      const sectionData = new Uint8Array(sectionTable.sizeOfRawData);
      const bytesRead = await fd.read(
        sectionData,
        0,
        sectionTable.sizeOfRawData,
        sectionTable.pointerToRawData
      );
      sections[sectionName] = sectionData;
    }
    const self = new PE(
      peHeader,
      optionalHeader,
      optionalHeaderDataDirectories,
      sectionTables,
      sections
    );

    if (!peHeader.characteristics.has(ECharacteristics.MACHINE_IS_32_BIT)) {
      throw new Error("Only 32-bit PE files are supported");
    }

    self.wordSize = 32;

    return self;
  }

  public toString() {
    return [
      this.peHeader.toString(),
      this.optionalHeader.toString(),
      this.optionalHeaderDataDirectories.toString(),
      this.sectionTables
        .map((sectionTable) => sectionTable.toString())
        .join("\n"),
      this.sections,
    ].join("\n");
  }
}
