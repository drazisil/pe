export enum ECharacteristics {
  RELOCATION_INFORMATION_STRIPPED = 1,
  FILE_IS_EXECUTABLE = 2,
  FILE_IS_LINE_NUMBER_STRIPPED = 4,
  LOCAL_SYMBOLS_STRIPPED = 8,
  AGGRESSIVE_WORKING_SET_TRIM_ENABLED = 16,
  APP_CAN_HANDLE_GREATER_THAN_2_GB_ADDRESSES = 32,
  LARGE_ADDRESS_AWARE = 128,
  MACHINE_IS_32_BIT = 256,
  DEBUG_STRIPPED_FROM_FILE_IN_DBG_FILE = 512,
  IF_IMAGE_IS_ON_REMOVABLE_MEDIA_COPY_AND_RUN_FROM_SWAP_FILE = 1024,
  IF_IMAGE_IS_ON_NET_COPY_AND_RUN_FROM_SWAP_FILE = 2048,
  SYSTEM_FILE = 4096,
  DLL = 8192,
  UP_SYSTEM_ONLY = 16384,
  BYTES_OF_MACHINE_WORD_ARE_REVERSED = 32768,
}

export class Characteristics {
  constructor(data: number) {
    this.data = data;
  }

  data: number;

  has(flag: ECharacteristics) {
    return (this.data & flag) === flag;
  }

  toString() {
    const characteristics: string[] = [];
    if (this.has(ECharacteristics.RELOCATION_INFORMATION_STRIPPED)) {
      characteristics.push("Relocation information stripped from file");
    }
    if (this.has(ECharacteristics.FILE_IS_EXECUTABLE)) {
      characteristics.push("File is executable");
    }
    if (this.has(ECharacteristics.FILE_IS_LINE_NUMBER_STRIPPED)) {
      characteristics.push("File is a line number stripped");
    }
    if (this.has(ECharacteristics.LOCAL_SYMBOLS_STRIPPED)) {
      characteristics.push("Local symbols stripped");
    }
    if (this.has(ECharacteristics.AGGRESSIVE_WORKING_SET_TRIM_ENABLED)) {
      characteristics.push("Aggressive working set trim enabled");
    }
    if (this.has(ECharacteristics.APP_CAN_HANDLE_GREATER_THAN_2_GB_ADDRESSES)) {
      characteristics.push("App can handle > 2 GB addresses");
    }
    if (this.has(ECharacteristics.LARGE_ADDRESS_AWARE)) {
      characteristics.push("Large address aware");
    }
    if (this.has(ECharacteristics.MACHINE_IS_32_BIT)) {
      characteristics.push("32-bit machine");
    }
    if (this.has(ECharacteristics.DEBUG_STRIPPED_FROM_FILE_IN_DBG_FILE)) {
      characteristics.push("Debug stripped from file in .DBG file");
    }
    if (this.has(ECharacteristics.IF_IMAGE_IS_ON_REMOVABLE_MEDIA_COPY_AND_RUN_FROM_SWAP_FILE)) {
      characteristics.push(
        "If Image is on removable media, copy and run from the swap file"
      );
    }
    if (this.has(ECharacteristics.IF_IMAGE_IS_ON_NET_COPY_AND_RUN_FROM_SWAP_FILE)) {
      characteristics.push(
        "If Image is on Net, copy and run from the swap file"
      );
    }
    if (this.has(ECharacteristics.SYSTEM_FILE)) {
      characteristics.push("System File");
    }
    if (this.has(ECharacteristics.DLL)) {
      characteristics.push("DLL");
    }
    if (this.has(ECharacteristics.UP_SYSTEM_ONLY)) {
      characteristics.push("Up System Only");
    }
    if (this.has(ECharacteristics.BYTES_OF_MACHINE_WORD_ARE_REVERSED)) {
      characteristics.push("Bytes of machine word are reversed");
    }
    return characteristics.join(", ");
  }

}
