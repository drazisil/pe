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
import { SectionTable } from "./SectionTable";
import { PEHeaderManager } from "./PEHeaderManager";

const instructionMap = new Map<number, string>([]);

export function decodeInstruction(word: number) {
    if (instructionMap.has(word)) {
        return instructionMap.get(word);
    }
    
    throw new Error(`Unknown instruction: ${toHex(word)}`);
}

const path = "/home/drazisil/Downloads/MCO/mcity.exe";

console.log("Hello World!");

const peHeaderManager = await PEHeaderManager.fromPath(path);

await peHeaderManager.run();
