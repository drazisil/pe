export function highByte(word: number) {
  return (word >> 8) & 255;
}
