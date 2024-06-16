export function toHex(d: number) {
  return ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}
