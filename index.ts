import { open } from "node:fs/promises";
import { toHex } from "./toHex";
import { u32 } from "./u32";
import { char } from "./char";
import { PEHeader } from "./PEHeader";
import { u16 } from "./u16";
import { lowByte } from "./lowByte";
import { highByte } from "./highByte";
import { OptionalHeader } from "./OptionalHeader";
import { toWindowsSubsystem } from "./toWindowsSubsystem";
import { parseDLLCharacteristics } from "./parseDLLCharacteristics";
import { OptionalHeaderDataDirectories } from "./OptionalHeaderDataDirectories";

function toInstruction(word: number) {
  switch (word) {
    default:
      throw new Error(`Unknown instruction: ${toHex(word)}`);
  }
}

enum SectionCharacteristicFlags {
    IMAGE_SCN_TYPE_NO_PAD = 0x00000008,
    IMAGE_SCN_CNT_CODE = 0x00000020,
    IMAGE_SCN_CNT_INITIALIZED_DATA = 0x00000040,
    IMAGE_SCN_CNT_UNINITIALIZED_DATA = 0x00000080,
    IMAGE_SCN_LNK_OTHER = 0x00000100,
    IMAGE_SCN_LNK_INFO = 0x00000200,
    IMAGE_SCN_LNK_REMOVE = 0x00000800,
    IMAGE_SCN_LNK_COMDAT = 0x00001000,
    IMAGE_SCN_GPREL = 0x00008000,
    IMAGE_SCN_MEM_PURGEABLE = 0x00020000,
    IMAGE_SCN_MEM_16BIT = 0x00020000,
    IMAGE_SCN_MEM_LOCKED = 0x00040000,
    IMAGE_SCN_MEM_PRELOAD = 0x00080000,
    IMAGE_SCN_ALIGN_1BYTES = 0x00100000,
    IMAGE_SCN_ALIGN_2BYTES = 0x00200000,
    IMAGE_SCN_ALIGN_4BYTES = 0x00300000,
    IMAGE_SCN_ALIGN_8BYTES = 0x00400000,
    IMAGE_SCN_ALIGN_16BYTES = 0x00500000,
    IMAGE_SCN_ALIGN_32BYTES = 0x00600000,
    IMAGE_SCN_ALIGN_64BYTES = 0x00700000,
    IMAGE_SCN_ALIGN_128BYTES = 0x00800000,
    IMAGE_SCN_ALIGN_256BYTES = 0x00900000,
    IMAGE_SCN_ALIGN_512BYTES = 0x00A00000,
    IMAGE_SCN_ALIGN_1024BYTES = 0x00B00000,
    IMAGE_SCN_ALIGN_2048BYTES = 0x00C00000,
    IMAGE_SCN_ALIGN_4096BYTES = 0x00D00000,
    IMAGE_SCN_ALIGN_8192BYTES = 0x00E00000,
    IMAGE_SCN_LNK_NRELOC_OVFL = 0x01000000,
    IMAGE_SCN_MEM_DISCARDABLE = 0x02000000,
    IMAGE_SCN_MEM_NOT_CACHED = 0x04000000,
    IMAGE_SCN_MEM_NOT_PAGED = 0x08000000,
    IMAGE_SCN_MEM_SHARED = 0x10000000,
    IMAGE_SCN_MEM_EXECUTE = 0x20000000,
    IMAGE_SCN_MEM_READ = 0x40000000,
    IMAGE_SCN_MEM_WRITE = 0x80000000,
}

function parseSectionCharacteristics(flags: number) {
    const characteristics: string[] = [];
    for (const flag in SectionCharacteristicFlags) {
        if (flags & Number(SectionCharacteristicFlags[flag])) {
            characteristics.push(flag);
        }
    }
    return characteristics.join(", ");
}


class SectionTable {
    constructor(data: Uint8Array, offset: number) {
        this.name = char(data, offset, 8);
        this.virtualSize = u32(data, offset + 8);
        this.virtualAddress = u32(data, offset + 12);
        this.sizeOfRawData = u32(data, offset + 16);
        this.pointerToRawData = u32(data, offset + 20);
        this.pointerToRelocations = u32(data, offset + 24);
        this.pointerToLinenumbers = u32(data, offset + 28);
        this.numberOfRelocations = u16(data, offset + 32);
        this.numberOfLinenumbers = u16(data, offset + 34);
        this.characteristics = u32(data, offset + 36);
    }
    
    name: string;
    virtualSize: number;
    virtualAddress: number;
    sizeOfRawData: number;
    pointerToRawData: number;
    pointerToRelocations: number;
    pointerToLinenumbers: number;
    numberOfRelocations: number;
    numberOfLinenumbers: number;
    characteristics: number;

    get size() {
        return 40;
    }
    
    toString() {
        return (
        `Name: ${this.name}\n` +
        `Virtual Size: ${this.virtualSize}\n` +
        `Virtual Address: ${this.virtualAddress}\n` +
        `Size of Raw Data: ${this.sizeOfRawData}\n` +
        `Pointer to Raw Data: ${this.pointerToRawData}\n` +
        `Pointer to Relocations: ${this.pointerToRelocations}\n` +
        `Pointer to Linenumbers: ${this.pointerToLinenumbers}\n` +
        `Number of Relocations: ${this.numberOfRelocations}\n` +
        `Number of Linenumbers: ${this.numberOfLinenumbers}\n` +
        `Characteristics: ${parseSectionCharacteristics(this.characteristics)}`
        );
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

console.log(`PE Header found at ${pointerToPEHeaderStart}`);

const peHeader = new PEHeader(data, pointerToPEHeaderStart);

console.log(peHeader.toString());

const optionalHeaderMagic = u16(data, pointerToPEHeaderStart + peHeader.size);

console.log(
  `Optional Header Magic: ${toHex(lowByte(optionalHeaderMagic))} ${toHex(
    highByte(optionalHeaderMagic)
  )}`
);

const peFormat = optionalHeaderMagic === 0x10b ? "PE32" : "PE32+";

if (peFormat !== "PE32") {
  throw new Error(`Invalid PE Format: ${peFormat}`);
}

console.log(`PE Format: ${peFormat}`);

const optionalHeaderSize = u16(
  data,
  pointerToPEHeaderStart + peHeader.size + 2
);

console.log(`Optional Header Size: ${optionalHeaderSize}`);

const optionalHeader = new OptionalHeader(
  data,
  pointerToPEHeaderStart + peHeader.size
);

console.log(optionalHeader.toString());

console.log(
  `Windows Subsystem: ${toWindowsSubsystem(optionalHeader.subsystem)}`
);

console.log(
  `DLL Characteristics: ${parseDLLCharacteristics(
    optionalHeader.dllCharacteristics
  )}`
);

const optionalHeaderDataDirectories = new OptionalHeaderDataDirectories(
  data,
  pointerToPEHeaderStart + peHeader.size + optionalHeader.size
);

console.log(optionalHeaderDataDirectories.toString());

const sectionTableStart = pointerToPEHeaderStart + peHeader.size + peHeader.sizeOfOptionalHeader;

for (let i = 0; i < peHeader.numberOfSections; i++) {
    const sectionTable = new SectionTable(data, sectionTableStart + i * 40);
    console.log(sectionTable.toString());
}

// for (let i = 0; i < data.length; i++) {
//     console.log(toHex(data[i]));
// }

fd.close();
