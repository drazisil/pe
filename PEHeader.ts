import { char, u16, u32 } from "./src/dataTypes";
import { time_t } from "./src/time_t";
import { machine } from "./machine";
import { Characteristics } from "./Characteristics";

export class PEHeader {
  constructor(data: Uint8Array, offset: number) {
    this.signature = char(data, offset, 4);
    this.machine = machine(u16(data, offset + 4));
    this.numberOfSections = u16(data, offset + 6);
    this.timeDateStamp = time_t(data, offset + 8);
    this.pointerToSymbolTable = u32(data, offset + 12);
    this.numberOfSymbols = u32(data, offset + 16);
    this.sizeOfOptionalHeader = u16(data, offset + 20);
    this.characteristics = new Characteristics(u16(data, offset + 22));
  }

  get size() {
    return 24;
  }

  signature: string;
  machine: string | undefined;
  numberOfSections: number;
  timeDateStamp: Date;
  pointerToSymbolTable: number;
  numberOfSymbols: number;
  sizeOfOptionalHeader: number;
  characteristics: Characteristics;

  toString() {
    return `PE Header:
        Signature: ${this.signature}
        Machine: ${this.machine}
        Number of Sections: ${this.numberOfSections}
        Time Date Stamp: ${this.timeDateStamp}
        Pointer to Symbol Table: ${this.pointerToSymbolTable}
        Number of Symbols: ${this.numberOfSymbols}
        Size of Optional Header: ${this.sizeOfOptionalHeader}
        Characteristics: ${this.characteristics}`;
  }
}
