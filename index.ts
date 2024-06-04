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

// for (let i = 0; i < data.length; i++) {
//     console.log(toHex(data[i]));
// }

fd.close();
