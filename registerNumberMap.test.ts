import { decodeModRM_32 } from "./registerNumberMap";

// Test case 1: Mod = 0, Reg = 1, RM = 2
console.log(decodeModRM_32(0x12)); // Output: mod: Register, reg: eCX, rm: edx

// Test case 2: Mod = 1, Reg = 3, RM = 4
console.log(decodeModRM_32(0x64)); // Output: mod: Register + Displacement Byte, reg: eBX, rm: esp

// Test case 3: Mod = 2, Reg = 5, RM = 6
console.log(decodeModRM_32(0xb6)); // Output: mod: Register + Displacement Dword, reg: eBP, rm: esi

// Test case 4: Mod = 3, Reg = 7, RM = 0
console.log(decodeModRM_32(0xf8)); // Output: mod: Register, reg: eDI, rm: eax
