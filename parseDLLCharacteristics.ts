enum DLLCharacteristics {
  RESERVED_1 = 1,
  RESERVED_2 = 2,
  RESERVED_4 = 4,
  RESERVED_8 = 8,
  DYNAMIC_BASE = 64,
  FORCE_INTEGRITY = 128,
  NX_COMPAT = 256,
  NO_ISOLATION = 512,
  NO_SEH = 1024,
  NO_BIND = 2048,
  APPCONTAINER = 4096,
  WDM_DRIVER = 8192,
  GUARD_CF = 16384,
  TERMINAL_SERVER_AWARE = 32768,
}
export function parseDLLCharacteristics(word: number) {
  const characteristics: string[] = [];

  if (word & DLLCharacteristics.RESERVED_1) {
    characteristics.push("RESERVED_1");
  }

  if (word & DLLCharacteristics.RESERVED_2) {
    characteristics.push("RESERVED_2");
  }

  if (word & DLLCharacteristics.RESERVED_4) {
    characteristics.push("RESERVED_4");
  }

  if (word & DLLCharacteristics.RESERVED_8) {
    characteristics.push("RESERVED_8");
  }

  if (word & DLLCharacteristics.DYNAMIC_BASE) {
    characteristics.push("DYNAMIC_BASE");
  }

  if (word & DLLCharacteristics.FORCE_INTEGRITY) {
    characteristics.push("FORCE_INTEGRITY");
  }

  if (word & DLLCharacteristics.NX_COMPAT) {
    characteristics.push("NX_COMPAT");
  }

  if (word & DLLCharacteristics.NO_ISOLATION) {
    characteristics.push("NO_ISOLATION");
  }

  if (word & DLLCharacteristics.NO_SEH) {
    characteristics.push("NO_SEH");
  }

  if (word & DLLCharacteristics.NO_BIND) {
    characteristics.push("NO_BIND");
  }

  if (word & DLLCharacteristics.APPCONTAINER) {
    characteristics.push("APPCONTAINER");
  }

  if (word & DLLCharacteristics.WDM_DRIVER) {
    characteristics.push("WDM_DRIVER");
  }

  if (word & DLLCharacteristics.GUARD_CF) {
    characteristics.push("GUARD_CF");
  }

  if (word & DLLCharacteristics.TERMINAL_SERVER_AWARE) {
    characteristics.push("TERMINAL_SERVER_AWARE");
  }

  return characteristics;
}
