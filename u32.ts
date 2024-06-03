export function u32(data: Uint8Array, offset: number) {
  return (
    data[offset] +
    (data[offset + 1] << 8) +
    (data[offset + 2] << 16) +
    (data[offset + 3] << 24)
  );
}
