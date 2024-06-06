import { toHex } from "./toHex";

// Map of instruction opcodes to their string representations
const instructionMap = new Map<number, string>([]);
instructionMap.set(0x55, "PUSH eBP");
instructionMap.set(0x8b, "MOV r32, r/m32 Ev");
instructionMap.set(0x90, "NOP");
instructionMap.set(0xa1, "MOV eAX, m32");
instructionMap.set(0xc3, "RETN");

/**
 * Decodes the instruction based on the given word.
 *
 * @param word - The word representing the instruction.
 * @returns The decoded instruction as a string.
 * @throws An error if the instruction is unknown.
 */
export function decodeInstruction(word: number): string {
  if (instructionMap.has(word)) {
    return instructionMap.get(word)!;
  }

  throw new Error(`Unknown instruction: ${toHex(word)}`);
}
