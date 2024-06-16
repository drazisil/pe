import { char, u16, u32 } from "./src/dataTypes";

enum SectionCharacteristicFlags {
  IMAGE_SCN_TYPE_NO_PAD = 8,
  IMAGE_SCN_CNT_CODE = 32,
  IMAGE_SCN_CNT_INITIALIZED_DATA = 64,
  IMAGE_SCN_CNT_UNINITIALIZED_DATA = 128,
  IMAGE_SCN_LNK_OTHER = 256,
  IMAGE_SCN_LNK_INFO = 512,
  IMAGE_SCN_LNK_REMOVE = 2048,
  IMAGE_SCN_LNK_COMDAT = 4096,
  IMAGE_SCN_GPREL = 32768,
  IMAGE_SCN_MEM_PURGEABLE = 131072,
  IMAGE_SCN_MEM_16BIT = 131072,
  IMAGE_SCN_MEM_LOCKED = 262144,
  IMAGE_SCN_MEM_PRELOAD = 524288,
  IMAGE_SCN_ALIGN_1BYTES = 1048576,
  IMAGE_SCN_ALIGN_2BYTES = 2097152,
  IMAGE_SCN_ALIGN_4BYTES = 3145728,
  IMAGE_SCN_ALIGN_8BYTES = 4194304,
  IMAGE_SCN_ALIGN_16BYTES = 5242880,
  IMAGE_SCN_ALIGN_32BYTES = 6291456,
  IMAGE_SCN_ALIGN_64BYTES = 7340032,
  IMAGE_SCN_ALIGN_128BYTES = 8388608,
  IMAGE_SCN_ALIGN_256BYTES = 9437184,
  IMAGE_SCN_ALIGN_512BYTES = 10485760,
  IMAGE_SCN_ALIGN_1024BYTES = 11534336,
  IMAGE_SCN_ALIGN_2048BYTES = 12582912,
  IMAGE_SCN_ALIGN_4096BYTES = 13631488,
  IMAGE_SCN_ALIGN_8192BYTES = 14680064,
  IMAGE_SCN_LNK_NRELOC_OVFL = 16777216,
  IMAGE_SCN_MEM_DISCARDABLE = 33554432,
  IMAGE_SCN_MEM_NOT_CACHED = 67108864,
  IMAGE_SCN_MEM_NOT_PAGED = 134217728,
  IMAGE_SCN_MEM_SHARED = 268435456,
  IMAGE_SCN_MEM_EXECUTE = 536870912,
  IMAGE_SCN_MEM_READ = 1073741824,
  IMAGE_SCN_MEM_WRITE = 2147483648,
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
export class SectionTable {
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
