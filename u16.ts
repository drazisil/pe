export function u16(data: Uint8Array, offset: number) {
  return data[offset] + (data[offset + 1] << 8);
}
