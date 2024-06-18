class PECharacteristics:
    def __init__(self, characteristics):
        self.characteristics = characteristics

        self.characteristics_dict = {}

        self.parse_characteristics()

    def parse_characteristics(self):
        characteristics = self.characteristics

        if characteristics & 0x0001:
            self.characteristics_dict["RELOCS_STRIPPED"] = True
        if characteristics & 0x0002:
            self.characteristics_dict["EXECUTABLE_IMAGE"] = True
        if characteristics & 0x0004:
            self.characteristics_dict["LINE_NUMS_STRIPPED"] = True
        if characteristics & 0x0008:
            self.characteristics_dict["LOCAL_SYMS_STRIPPED"] = True
        if characteristics & 0x0010:
            self.characteristics_dict["AGGRESSIVE_WS_TRIM"] = True
        if characteristics & 0x0020:
            self.characteristics_dict["LARGE_ADDRESS_AWARE"] = True
        if characteristics & 0x0080:
            self.characteristics_dict["BYTES_REVERSED_LO"] = True
        if characteristics & 0x0100:
            self.characteristics_dict["32BIT_MACHINE"] = True
        if characteristics & 0x0200:
            self.characteristics_dict["DEBUG_STRIPPED"] = True
        if characteristics & 0x0400:
            self.characteristics_dict["REMOVABLE_RUN_FROM_SWAP"] = True
        if characteristics & 0x0800:
            self.characteristics_dict["NET_RUN_FROM_SWAP"] = True
        if characteristics & 0x1000:
            self.characteristics_dict["SYSTEM"] = True
        if characteristics & 0x2000:
            self.characteristics_dict["DLL"] = True
        if characteristics & 0x4000:
            self.characteristics_dict["UP_SYSTEM_ONLY"] = True
        if characteristics & 0x8000:
            self.characteristics_dict["BYTES_REVERSED_HI"] = True

    def has_characteristic(self, characteristic):
        return self.characteristics_dict.get(characteristic, False)

    @staticmethod
    def from_bytes(data):
        characteristics = int.from_bytes(data, byteorder="little")
        return PECharacteristics(characteristics)

    def __str__(self):
        return "PECharacteristics(characteristics={})".format(self.characteristics_dict)

    def __repr__(self):
        return str(self)
