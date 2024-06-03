import { toHex } from "./toHex";
import { isAscii } from "./isAscii";

export function char(data: Uint8Array, offset: number, length: number) {
  let result = "";
  for (let i = 0; i < length; i++) {
    if (!isAscii(data[offset + i])) {
      result += `\\${toHex(data[offset + i])}`;
      continue;
    }
    result += String.fromCharCode(data[offset + i]);
  }
  return result;
}
