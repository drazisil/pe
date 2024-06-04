import { toHex } from "./toHex";

enum WindowsSubsystem {
  UNKNOWN = 0,
  NATIVE = 1,
  WINDOWS_GUI = 2,
  WINDOWS_CUI = 3,
  OS2_CUI = 5,
  POSIX_CUI = 7,
  WINDOWS_CE_GUI = 9,
  EFI_APPLICATION = 10,
  EFI_BOOT_SERVICE_DRIVER = 11,
  EFI_RUNTIME_DRIVER = 12,
  EFI_ROM = 13,
  XBOX = 14,
  WINDOWS_BOOT_APPLICATION = 16,
}
export function toWindowsSubsystem(word: number) {
  switch (word) {
    case WindowsSubsystem.UNKNOWN:
      return "UNKNOWN";
    case WindowsSubsystem.NATIVE:
      return "NATIVE";
    case WindowsSubsystem.WINDOWS_GUI:
      return "WINDOWS_GUI";
    case WindowsSubsystem.WINDOWS_CUI:
      return "WINDOWS_CUI";
    case WindowsSubsystem.OS2_CUI:
      return "OS2_CUI";
    case WindowsSubsystem.POSIX_CUI:
      return "POSIX_CUI";
    case WindowsSubsystem.WINDOWS_CE_GUI:
      return "WINDOWS_CE_GUI";
    case WindowsSubsystem.EFI_APPLICATION:
      return "EFI_APPLICATION";
    case WindowsSubsystem.EFI_BOOT_SERVICE_DRIVER:
      return "EFI_BOOT_SERVICE_DRIVER";
    case WindowsSubsystem.EFI_RUNTIME_DRIVER:
      return "EFI_RUNTIME_DRIVER";
    case WindowsSubsystem.EFI_ROM:
      return "EFI_ROM";
    case WindowsSubsystem.XBOX:
      return "XBOX";
    case WindowsSubsystem.WINDOWS_BOOT_APPLICATION:
      return "WINDOWS_BOOT_APPLICATION";
    default:
      throw new Error(`Unknown Windows Subsystem: ${toHex(word)}`);
  }
}
