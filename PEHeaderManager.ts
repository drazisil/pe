import { open } from "node:fs/promises";
import { u32 } from "./u32";
import { PEHeader } from "./PEHeader";
import { u16 } from "./u16";
import { OptionalHeader } from "./OptionalHeader";
import { OptionalHeaderDataDirectories } from "./OptionalHeaderDataDirectories";
import { SectionTable } from "./SectionTable";
import { decodeInstruction } from ".";

export class PEHeaderManager {
  private readonly peHeader: PEHeader;
  private readonly optionalHeader: OptionalHeader;
  private readonly optionalHeaderDataDirectories: OptionalHeaderDataDirectories;
  private readonly sectionTables: SectionTable[];
  private readonly sections: { [key: string]: Uint8Array };

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
    const codeSection = this.sections[".text"];

    if (!codeSection) {
      throw new Error("Code section not found");
    }

    let instructionPointer = 0;

    while (instructionPointer < codeSection.length) {
      const instruction = u32(codeSection, instructionPointer);
      console.log(decodeInstruction(instruction));
      instructionPointer += 4;
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
    return new PEHeaderManager(
      peHeader,
      optionalHeader,
      optionalHeaderDataDirectories,
      sectionTables,
      sections
    );
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
