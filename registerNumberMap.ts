/**
 * Map that associates register numbers with their corresponding names.
 */
const registerNumberMap = new Map<number, string>([
  [0, "eAX"],
  [1, "eCX"],
  [2, "eDX"],
  [3, "eBX"],
  [4, "eSP"],
  [5, "eBP"],
  [6, "eSI"],
  [7, "eDI"],
]);
/**
 * Map that associates modRM values with corresponding register names.
 */
const modRMMap = new Map<number, string>([
  [0, "eax"],
  [1, "ecx"],
  [2, "edx"],
  [3, "ebx"],
  [4, "esp"],
  [5, "ebp"],
  [6, "esi"],
  [7, "edi"],
]);
/**
 * Map that defines the mappings for the mod field in instructions.
 * The key represents the mod value, and the value represents the corresponding description.
 */
const modMappings = new Map<number, string>([
  [0, "Register"],
  [1, "Register + Displacement"],
  [2, "Register + Displacement"],
  [3, "Register"],
]);
// Set of instruction opcodes that require a ModRM byte
const opcodesWithModRM = new Set<number>([0x8b]);
/**
 * Checks if the given word is an opcode with ModRM.
 * @param word - The opcode word to check.
 * @returns `true` if the word is an opcode with ModRM, `false` otherwise.
 */

export function isOpcodeWithModRM(word: number): boolean {
  return opcodesWithModRM.has(word);
}
/**
 * Decodes the mod value and returns a string representation.
 * @param mod - The mod value to decode.
 * @returns A string representation of the mod value.
 */
export function decodeMod_32(mod: number): string {
  return `mod: ${modMappings.get(mod)}`;
}
/**
 * Decodes a 32-bit register number and returns a string representation of the register.
 * @param reg - The register number to decode.
 * @returns A string representation of the register.
 */
export function decodeReg_32(reg: number): string {
  return `reg: ${registerNumberMap.get(reg)}`;
}
/**
 * Decodes the RM_32 value and returns a string representation.
 *
 * @param rm - The RM_32 value to decode.
 * @returns A string representation of the decoded RM_32 value.
 */
export function decodeRM_32(rm: number): string {
  return `rm: ${modRMMap.get(rm)}`;
}
/**
 * Decodes the ModRM byte for 32-bit instructions.
 *
 * @param word - The ModRM byte to decode.
 * @returns A string representation of the decoded ModRM byte.
 */

export function decodeModRM_32(word: number): string {
  const mod = (word & 192) >> 6;
  const reg = (word & 56) >> 3;
  const rm = word & 7;

  return `${decodeMod_32(mod)}, ${decodeReg_32(reg)}, ${decodeRM_32(rm)}`;
}
