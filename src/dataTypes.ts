import { toHex } from "./toHex";
import { isAscii } from "../isAscii";

/**
 * Retrieves the value at the specified offset in the given Uint8Array.
 * 
 * @param data - The Uint8Array to retrieve the value from.
 * @param offset - The offset at which to retrieve the value.
 * @returns The value at the specified offset.
 */
export function u8(data: Uint8Array, offset: number) {
  return data[offset];
}

/**
 * Reads a 16-bit unsigned integer from the given `data` array starting at the specified `offset`.
 * @param data - The array containing the data.
 * @param offset - The offset at which to start reading the 16-bit unsigned integer.
 * @returns The 16-bit unsigned integer value.
 */
export function u16(data: Uint8Array, offset: number) {
  return data[offset] + (data[offset + 1] << 8);
}

/**
 * Converts a Uint8Array to a 32-bit unsigned integer.
 * @param data - The Uint8Array containing the data.
 * @param offset - The offset in the Uint8Array where the 32-bit integer starts.
 * @returns The converted 32-bit unsigned integer.
 */
export function u32(data: Uint8Array, offset: number) {
  return (
    data[offset] +
    (data[offset + 1] << 8) +
    (data[offset + 2] << 16) +
    (data[offset + 3] << 24)
  );
}

/**
 * Converts a portion of a Uint8Array to a string of characters.
 * Non-ASCII characters are represented as escape sequences.
 * 
 * @param data - The Uint8Array containing the data to convert.
 * @param offset - The starting offset within the Uint8Array.
 * @param length - The number of bytes to convert.
 * @returns The resulting string of characters.
 */
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
