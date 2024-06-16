import { u16, u32 } from "./src/dataTypes";

export class OptionalHeader {
  constructor(data: Uint8Array, offset: number) {
    this.magic = u16(data, offset);

    if (this.magic !== 0x10b && this.magic !== 0x20b) {
      throw new Error(`Invalid magic: ${this.magic}`);
    }

    this.peFormat = this.magic === 0x10b ? "PE32" : "PE32+";

    this.majorLinkerVersion = data[offset + 2];
    this.minorLinkerVersion = data[offset + 3];
    this.sizeOfCode = u32(data, offset + 4);
    this.sizeOfInitializedData = u32(data, offset + 8);
    this.sizeOfUninitializedData = u32(data, offset + 12);
    this.addressOfEntryPoint = u32(data, offset + 16);
    this.baseOfCode = u32(data, offset + 20);
    this.baseOfData = u32(data, offset + 24);
    this.imageBase = u32(data, offset + 28);
    this.sectionAlignment = u32(data, offset + 32);
    this.fileAlignment = u32(data, offset + 36);
    this.majorOperatingSystemVersion = u16(data, offset + 40);
    this.minorOperatingSystemVersion = u16(data, offset + 42);
    this.majorImageVersion = u16(data, offset + 44);
    this.minorImageVersion = u16(data, offset + 46);
    this.majorSubsystemVersion = u16(data, offset + 48);
    this.minorSubsystemVersion = u16(data, offset + 50);
    this.win32VersionValue = u32(data, offset + 52);
    this.sizeOfImage = u32(data, offset + 56);
    this.sizeOfHeaders = u32(data, offset + 60);
    this.checkSum = u32(data, offset + 64);
    this.subsystem = u16(data, offset + 68);
    this.dllCharacteristics = u16(data, offset + 70);
    this.sizeOfStackReserve = u32(data, offset + 72);
    this.sizeOfStackCommit = u32(data, offset + 76);
    this.sizeOfHeapReserve = u32(data, offset + 80);
    this.sizeOfHeapCommit = u32(data, offset + 84);
    this.loaderFlags = u32(data, offset + 88);
    this.numberOfRvaAndSizes = u32(data, offset + 92);
  }

  magic: number;
  peFormat: string;
  majorLinkerVersion: number;
  minorLinkerVersion: number;
  sizeOfCode: number;
  sizeOfInitializedData: number;
  sizeOfUninitializedData: number;
  addressOfEntryPoint: number;
  baseOfCode: number;
  baseOfData: number;
  imageBase: number;
  sectionAlignment: number;
  fileAlignment: number;
  majorOperatingSystemVersion: number;
  minorOperatingSystemVersion: number;
  majorImageVersion: number;
  minorImageVersion: number;
  majorSubsystemVersion: number;
  minorSubsystemVersion: number;
  win32VersionValue: number;
  sizeOfImage: number;
  sizeOfHeaders: number;
  checkSum: number;
  subsystem: number;
  dllCharacteristics: number;
  sizeOfStackReserve: number;
  sizeOfStackCommit: number;
  sizeOfHeapReserve: number;
  sizeOfHeapCommit: number;
  loaderFlags: number;
  numberOfRvaAndSizes: number;

  get size() {
    return this.magic === 0x10b ? 96 : 112;
  }

  toString() {
    return `Optional Header:
                Magic: ${this.magic}
                PE Format: ${this.peFormat}
                Major Linker Version: ${this.majorLinkerVersion}
                Minor Linker Version: ${this.minorLinkerVersion}
                Size of Code: ${this.sizeOfCode}
                Size of Initialized Data: ${this.sizeOfInitializedData}
                Size of Uninitialized Data: ${this.sizeOfUninitializedData}
                Address of Entry Point: ${this.addressOfEntryPoint}
                Base of Code: ${this.baseOfCode}
                Base of Data: ${this.baseOfData}
                Image Base: ${this.imageBase}
                Section Alignment: ${this.sectionAlignment}
                File Alignment: ${this.fileAlignment}
                Major Operating System Version: ${this.majorOperatingSystemVersion}
                Minor Operating System Version: ${this.minorOperatingSystemVersion}
                Major Image Version: ${this.majorImageVersion}
                Minor Image Version: ${this.minorImageVersion}
                Major Subsystem Version: ${this.majorSubsystemVersion}
                Minor Subsystem Version: ${this.minorSubsystemVersion}
                Win32 Version Value: ${this.win32VersionValue}
                Size of Image: ${this.sizeOfImage}
                Size of Headers: ${this.sizeOfHeaders}
                Check Sum: ${this.checkSum}
                Subsystem: ${this.subsystem}
                DLL Characteristics: ${this.dllCharacteristics}
                Size of Stack Reserve: ${this.sizeOfStackReserve}
                Size of Stack Commit: ${this.sizeOfStackCommit}
                Size of Heap Reserve: ${this.sizeOfHeapReserve}
                Size of Heap Commit: ${this.sizeOfHeapCommit}
                Loader Flags: ${this.loaderFlags}
                Number of RVA and Sizes: ${this.numberOfRvaAndSizes}`;
  }
}
