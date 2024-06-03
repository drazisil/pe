import { open } from "node:fs/promises";
import { toHex } from "./toHex";
import { u32 } from "./u32";
import { char } from "./char";
import { PEHeader } from "./PEHeader";
import { OptionalHeader } from "./OptionalHeader";
import { u16 } from "./u16";

function toInstruction(word: number) {
  switch (word) {
    default:
      throw new Error(`Unknown instruction: ${toHex(word)}`);
  }
}

class OptionalHeaderStandard_PE {
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

class OptionalHeaderWindows_PE {
  constructor(data: Uint8Array, offset: number) {
    this.imageBase = u32(data, offset);
    this.sectionAlignment = u32(data, offset + 4);
    this.fileAlignment = u32(data, offset + 8);
    this.majorOperatingSystemVersion = u16(data, offset + 12);
    this.minorOperatingSystemVersion = u16(data, offset + 14);
    this.majorImageVersion = u16(data, offset + 16);
    this.minorImageVersion = u16(data, offset + 18);
    this.majorSubsystemVersion = u16(data, offset + 20);
    this.minorSubsystemVersion = u16(data, offset + 22);
    this.win32VersionValue = u32(data, offset + 24);
    this.sizeOfImage = u32(data, offset + 28);
    this.sizeOfHeaders = u32(data, offset + 32);
    this.checkSum = u32(data, offset + 36);
    this.subsystem = u16(data, offset + 40);
    this.dllCharacteristics = u16(data, offset + 42);
    this.sizeOfStackReserve = u32(data, offset + 44);
    this.sizeOfStackCommit = u32(data, offset + 48);
    this.sizeOfHeapReserve = u32(data, offset + 52);
    this.sizeOfHeapCommit = u32(data, offset + 56);
    this.loaderFlags = u32(data, offset + 60);
    this.numberOfRvaAndSizes = u32(data, offset + 64);
  }

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
    return 68;
  }

  toString() {
    return `Optional Header:
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
                Checksum: ${this.checkSum}
                Subsystem: ${this.subsystem}
                DLL Characteristics: ${this.dllCharacteristics}
                Size of Stack Reserve: ${this.sizeOfStackReserve}
                Size of Stack Commit: ${this.sizeOfStackCommit}
                Size of Heap Reserve: ${this.sizeOfHeapReserve}
                Size of Heap Commit: ${this.sizeOfHeapCommit}
                Loader Flags: ${this.loaderFlags}
                Number of Rva and Sizes: ${this.numberOfRvaAndSizes}`;
  }
}

const path = "/home/drazisil/Downloads/MCO/mcity.exe";

console.log("Hello World!");

const fd = await open(path, "r");

const fileSize = (await fd.stat()).size;

console.log(`File size: ${fileSize}`);

let currentOffset = 0;
let filePosition = 0;

const data = new Uint8Array(fileSize);

const bytesRead = await fd.read(data, filePosition, fileSize, currentOffset);

console.log(`Read ${bytesRead.bytesRead} bytes`);

const pointerToPEHeaderStart = u32(data, 0x3c);

console.log(`Pointer to PE header: ${pointerToPEHeaderStart}`);

const peHeaderStart = char(data, pointerToPEHeaderStart, 4);

if (peHeaderStart !== "PE\\00\\00") {
  throw new Error("Invalid PE Header");
}

console.log(`PE Header found at ${toHex(pointerToPEHeaderStart)}`);

const peHeader = new PEHeader(data, pointerToPEHeaderStart);

console.log(peHeader.toString());

const optionalHeaderMagic = u16(data, pointerToPEHeaderStart + peHeader.size);

console.log(`Optional Header Magic: ${toHex(optionalHeaderMagic)}`);

const peFormat = optionalHeaderMagic === 0x10b ? "PE32" : "PE32+";

if (peFormat !== "PE32") {
  throw new Error(`Invalid PE Format: ${peFormat}`);
}

const optionalHeaderWindows_PE = new OptionalHeaderWindows_PE(
  data,
  pointerToPEHeaderStart + peHeader.size
);

console.log(optionalHeaderWindows_PE.toString());

// for (let i = 0; i < data.length; i++) {
//     console.log(toHex(data[i]));
// }

fd.close();
