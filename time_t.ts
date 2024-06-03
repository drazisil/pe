import { u32 } from "./u32";

export function time_t(data: Uint8Array, offset: number) {
  return new Date(u32(data, offset) * 1000);
}
