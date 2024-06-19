class PEMachine:
    def __init__(self, value):
        self.value = value

    @staticmethod
    def from_bytes(data):
        return PEMachine(int.from_bytes(data, byteorder="little"))

    def __str__(self):
        return {
            0x0: "IMAGE_FILE_MACHINE_UNKNOWN",
            0x1D3: "IMAGE_FILE_MACHINE_AM33",
            0x8664: "IMAGE_FILE_MACHINE_AMD64",
            0x1C0: "IMAGE_FILE_MACHINE_ARM",
            0x1C4: "IMAGE_FILE_MACHINE_ARMNT",
            0xAA64: "IMAGE_FILE_MACHINE_ARM64",
            0xEBC: "IMAGE_FILE_MACHINE_EBC",
            0x14C: "IMAGE_FILE_MACHINE_I386",
            0x200: "IMAGE_FILE_MACHINE_IA64",
            0x9041: "IMAGE_FILE_MACHINE_M32R",
            0x266: "IMAGE_FILE_MACHINE_MIPS16",
            0x366: "IMAGE_FILE_MACHINE_MIPSFPU",
            0x466: "IMAGE_FILE_MACHINE_MIPSFPU16",
            0x1F0: "IMAGE_FILE_MACHINE_POWERPC",
            0x1F1: "IMAGE_FILE_MACHINE_POWERPCFP",
            0x166: "IMAGE_FILE_MACHINE_R4000",
            0x1A2: "IMAGE_FILE_MACHINE_SH3",
            0x1A3: "IMAGE_FILE_MACHINE_SH3DSP",
            0x1A6: "IMAGE_FILE_MACHINE_SH4",
            0x1A8: "IMAGE_FILE_MACHINE_SH5",
            0x1C2: "IMAGE_FILE_MACHINE_THUMB",
            0x169: "IMAGE_FILE_MACHINE_WCEMIPSV2",
        }[self.value]

    def __repr__(self):
        return "PEMachine(value={})".format(self.value)
