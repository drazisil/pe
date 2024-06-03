import { u16 } from "./u16";
import { u32 } from "./u32";

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
            Base of Data: ${this.baseOfData}`;
  }
}
