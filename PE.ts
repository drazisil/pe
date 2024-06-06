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
  private instructionPointer = 0;
  private lastInstructionPointer: number | null = null;
  private instruction: number | null = null;
  private lastInstruction: number | null = null;
  private address: number | null = null;

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

  public async run() {
    if (this.wordSize === -1) {
      throw new Error("Word size not set");
    }

    const codeSection = this.sections[".text"];

    if (!codeSection) {
      throw new Error("Code section not found");
    }

    let instructionPointer = 0;

    while (instructionPointer < codeSection.length) {
      const instruction = u8(codeSection, instructionPointer);
      instructionPointer++;

      console.log(
        `0x${instructionPointer.toString(16)}: 0x${Math.abs(
          instruction
        ).toString(16)}`
      );

      const instructionString = decodeInstruction(instruction);

      if (instructionPointer === this.lastInstructionPointer) {
        console.log(
          `Infinite loop detected at 0x${instructionPointer.toString(16)}`
        );
        break;
      }

      if (isOpcodeWithModRM(instruction)) {
        const modRM = u8(codeSection, instructionPointer);
        instructionPointer++;
        console.log(`ModRM: ${modRM}`);

        if (decodeMod_32(modRM) === "mod: Register + Displacement") {
          const displacement = u32(codeSection, instructionPointer);
          console.log(`Displacement: 0x${displacement.toString(16)}`);
          instructionPointer += 4;
        }

        console.log(decodeModRM_32(modRM));
        continue
      }

      if (instructionString.includes(",")) {
        const [instructionName, operand] = instructionString.split(",");
        console.log(instructionName, operand);

        if (operand.includes("m32")) {
          const address = u32(codeSection, instructionPointer);
          console.log(`Address: 0x${address.toString(16)}`);
          instructionPointer += 4;
        }
      }

      console.log(instructionString);
      this.lastInstructionPointer = instructionPointer;
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
