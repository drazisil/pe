from enum import Enum


class EPEMachine(Enum):
    UNKNOWN = 0x0
    AM33 = 0x1D3
    AMD64 = 0x8664
    ARM = 0x1C0
    ARMNT = 0x1C4
    EBC = 0xEBC
    I386 = 0x14C
    IA64 = 0x200
    M32R = 0x9041
    MIPS16 = 0x266
    MIPSFPU = 0x366
    MIPSFPU16 = 0x466
    POWERPC = 0x1F0
    POWERPCFP = 0x1F1
    R4000 = 0x166
    SH3 = 0x1A2
    SH3DSP = 0x1A3
    SH4 = 0x1A6
    SH5 = 0x1A8
    THUMB = 0x1C2
    WCEMIPSV2 = 0x169
