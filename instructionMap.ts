import { toHex } from "./toHex";

const instructionMap = new Map<number, string>([]);
instructionMap.set(161, "MOV eAX, m32");

export function decodeInstruction(word: number): string {
  if (instructionMap.has(word)) {
    return instructionMap.get(word)!;
  }

  throw new Error(`Unknown instruction: ${toHex(word)}`);
}
