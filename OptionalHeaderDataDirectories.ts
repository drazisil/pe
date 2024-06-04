import { u32 } from "./u32";

class DataDirectory {
  constructor(data: Uint8Array, offset: number) {
    this.virtualAddress = u32(data, offset);
    this.size = u32(data, offset + 4);
  }

  virtualAddress: number;
  size: number;

  toString() {
    return `Virtual Address: ${this.virtualAddress}, Size: ${this.size}`;
  }
}
export class OptionalHeaderDataDirectories {
  constructor(data: Uint8Array, offset: number) {
    this.exportTable = new DataDirectory(data, offset);
    this.importTable = new DataDirectory(data, offset + 8);
    this.resourceTable = new DataDirectory(data, offset + 16);
    this.exceptionTable = new DataDirectory(data, offset + 24);
    this.certificateTable = new DataDirectory(data, offset + 32);
    this.baseRelocationTable = new DataDirectory(data, offset + 40);
    this.debug = new DataDirectory(data, offset + 48);
    this.architecture = new DataDirectory(data, offset + 56);
    this.globalPtr = new DataDirectory(data, offset + 64);
    this.tlsTable = new DataDirectory(data, offset + 72);
    this.loadConfigTable = new DataDirectory(data, offset + 80);
    this.boundImport = new DataDirectory(data, offset + 88);
    this.iat = new DataDirectory(data, offset + 96);
    this.delayImportDescriptor = new DataDirectory(data, offset + 104);
    this.cliHeader = new DataDirectory(data, offset + 112);
    this.reserved = new DataDirectory(data, offset + 120);
  }

  exportTable: DataDirectory;
  importTable: DataDirectory;
  resourceTable: DataDirectory;
  exceptionTable: DataDirectory;
  certificateTable: DataDirectory;
  baseRelocationTable: DataDirectory;
  debug: DataDirectory;
  architecture: DataDirectory;
  globalPtr: DataDirectory;
  tlsTable: DataDirectory;
  loadConfigTable: DataDirectory;
  boundImport: DataDirectory;
  iat: DataDirectory;
  delayImportDescriptor: DataDirectory;
  cliHeader: DataDirectory;
  reserved: DataDirectory;

  toString() {
    return (
      `Export Table: ${this.exportTable.toString()}\n` +
      `Import Table: ${this.importTable.toString()}\n` +
      `Resource Table: ${this.resourceTable.toString()}\n` +
      `Exception Table: ${this.exceptionTable.toString()}\n` +
      `Certificate Table: ${this.certificateTable.toString()}\n` +
      `Base Relocation Table: ${this.baseRelocationTable.toString()}\n` +
      `Debug: ${this.debug.toString()}\n` +
      `Architecture: ${this.architecture.toString()}\n` +
      `Global Pointer: ${this.globalPtr.toString()}\n` +
      `TLS Table: ${this.tlsTable.toString()}\n` +
      `Load Config Table: ${this.loadConfigTable.toString()}\n` +
      `Bound Import: ${this.boundImport.toString()}\n` +
      `IAT: ${this.iat.toString()}\n` +
      `Delay Import Descriptor: ${this.delayImportDescriptor.toString()}\n` +
      `CLI Header: ${this.cliHeader.toString()}\n` +
      `Reserved: ${this.reserved.toString()}`
    );
  }
}
