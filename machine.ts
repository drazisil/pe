enum Machine {
  UNKNOWN = 0,
  AM33 = 467,
  AMD64 = 34404,
  ARM = 448,
  ARMNT = 452,
  EBC = 3772,
  I386 = 332,
  IA64 = 512,
  M32R = 36929,
  MIPS16 = 614,
  MIPSFPU = 870,
  MIPSFPU16 = 1126,
  POWERPC = 496,
  POWERPCFP = 497,
  R4000 = 358,
  SH3 = 418,
  SH3DSP = 419,
  SH4 = 422,
  SH5 = 424,
  THUMB = 450,
  WCEMIPSV2 = 361,
}
export function machine(data: number) {
  switch (data) {
    case Machine.UNKNOWN:
      return "Unknown";
    case Machine.AM33:
      return "Matsushita AM33";
    case Machine.AMD64:
      return "x64";
    case Machine.ARM:
      return "ARM little endian";
    case Machine.ARMNT:
      return "ARM Thumb-2 little endian";
    case Machine.EBC:
      return "EFI byte code";
    case Machine.I386:
      return "Intel 386 or later processors and compatible processors";
    case Machine.IA64:
      return "Intel Itanium processor family";
    case Machine.M32R:
      return "Mitsubishi M32R little endian";
    case Machine.MIPS16:
      return "MIPS16";
    case Machine.MIPSFPU:
      return "MIPS with FPU";
    case Machine.MIPSFPU16:
      return "MIPS16 with FPU";
    case Machine.POWERPC:
      return "Power PC little endian";
    case Machine.POWERPCFP:
      return "Power PC with floating point support";
    case Machine.R4000:
      return "MIPS little endian";
    case Machine.SH3:
      return "Hitachi SH3";
    case Machine.SH3DSP:
      return "Hitachi SH3 DSP";
    case Machine.SH4:
      return "Hitachi SH4";
    case Machine.SH5:
      return "Hitachi SH5";
    case Machine.THUMB:
      return "ARM or Thumb";
    case Machine.WCEMIPSV2:
      return "MIPS little-endian WCE v2";
  }
}
