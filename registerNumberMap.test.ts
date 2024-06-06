import assert from "node:assert";
import { decodeModRM_32 } from "./registerNumberMap";
import test from "node:test";

test("decodeModRM_32", () => {
    // Test case 1: Mod = 0, Reg = 2, RM = 2
    assert.strictEqual(decodeModRM_32(0x12), "mod: Register, reg: eDX, rm: edx");
    
    // Test case 2: Mod = 1, Reg = 4, RM = 4
    assert.strictEqual(decodeModRM_32(0x64), "mod: Register + Displacement Byte, reg: eSP, rm: esp");
    
    // Test case 3: Mod = 2, Reg = 5, RM = 1
    assert.strictEqual(decodeModRM_32(0xa9), "mod: Register + Displacement Dword, reg: eBP, rm: ecx");
    
    // Test case 4: Mod = 3, Reg = 7, RM = 0
    assert.strictEqual(decodeModRM_32(0xf8), "mod: Register, reg: eDI, rm: eax");});
