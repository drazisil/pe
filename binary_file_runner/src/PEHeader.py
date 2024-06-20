import datetime
from binary_file_runner.src.PEMachine import PEMachine

windows_epoch = datetime.datetime(1970, 1, 1)


def file_time_to_datetime(file_time):
    return windows_epoch + datetime.timedelta(seconds=file_time)


class PEHeader:
    def __init__(
        self,
        signature,
        machine,
        numberOfSections,
        timeDateStamp,
        pointerToSymbolTable,
        numberOfSymbols,
        sizeOfOptionalHeader,
        characteristics,
    ):
        self.signature = signature
        self.machine = machine
        self.numberOfSections = numberOfSections
        self.timeDateStamp = timeDateStamp
        self.pointerToSymbolTable = pointerToSymbolTable
        self.numberOfSymbols = numberOfSymbols
        self.sizeOfOptionalHeader = sizeOfOptionalHeader
        self.characteristics = characteristics

        self.parsedCharacteristics: list[str] = []

        self.parse_characteristics()

    def parse_characteristics(self):
        characteristics = self.characteristics

        if characteristics & 0x0001:
            self.parsedCharacteristics.append("RELOCS_STRIPPED")
        if characteristics & 0x0002:
            self.parsedCharacteristics.append("EXECUTABLE_IMAGE")

        if characteristics & 0x0004:
            self.parsedCharacteristics.append("LINE_NUMS_STRIPPED")

        if characteristics & 0x0008:
            self.parsedCharacteristics.append("LOCAL_SYMS_STRIPPED")

        if characteristics & 0x0010:
            self.parsedCharacteristics.append("AGGRESSIVE_WS_TRIM")

        if characteristics & 0x0020:
            self.parsedCharacteristics.append("LARGE_ADDRESS_AWARE")

        if characteristics & 0x0080:
            self.parsedCharacteristics.append("BYTES_REVERSED_LO")

        if characteristics & 0x0100:
            self.parsedCharacteristics.append("32BIT_MACHINE")

        if characteristics & 0x0200:
            self.parsedCharacteristics.append("DEBUG_STRIPPED")

        if characteristics & 0x0400:
            self.parsedCharacteristics.append("REMOVABLE_RUN_FROM_SWAP")

        if characteristics & 0x0800:
            self.parsedCharacteristics.append("NET_RUN_FROM_SWAP")

        if characteristics & 0x1000:
            self.parsedCharacteristics.append("SYSTEM")

        if characteristics & 0x2000:
            self.parsedCharacteristics.append("DLL")

        if characteristics & 0x4000:
            self.parsedCharacteristics.append("UP_SYSTEM_ONLY")

        if characteristics & 0x8000:
            self.parsedCharacteristics.append("BYTES_REVERSED_HI")

    @staticmethod
    def from_bytes(data):
        signature = data[0:4].decode("utf-8")
        machine = PEMachine(int.from_bytes(data[4:6], byteorder="little"))
        numberOfSections = int.from_bytes(data[6:8], byteorder="little")
        timeDateStamp = int.from_bytes(data[8:12], byteorder="little")
        timeDateStamp = file_time_to_datetime(timeDateStamp).strftime("%Y-%m-%d %H:%M:%S")
        pointerToSymbolTable = int.from_bytes(data[12:16], byteorder="little")
        numberOfSymbols = int.from_bytes(data[16:20], byteorder="little")
        sizeOfOptionalHeader = int.from_bytes(data[20:22], byteorder="little")
        characteristics = int.from_bytes(data[22:24], byteorder="little")

        return PEHeader(
            signature,
            machine,
            numberOfSections,
            timeDateStamp,
            pointerToSymbolTable,
            numberOfSymbols,
            sizeOfOptionalHeader,
            characteristics,
        )

    def __str__(self):
        pretty = (
            f"\tsignature: {self.signature}\n",
            f"\tmachine: {self.machine}\n",
            f"\tnumberOfSections: {self.numberOfSections}\n",
            f"\ttimeDateStamp: {self.timeDateStamp}\n",
            f"\tpointerToSymbolTable: {self.pointerToSymbolTable}\n",
            f"\tnumberOfSymbols: {self.numberOfSymbols}\n",
            f"\tsizeOfOptionalHeader: {self.sizeOfOptionalHeader}\n",
            "\tcharacteristics: \n",
        )
        pretty = "".join(pretty).replace("\t", "  ")
        for characteristic in self.parsedCharacteristics:
            pretty += f"\t\t{characteristic}\n"
        pretty = pretty.replace("\t", "  ")
        print(pretty.count("\t"))
        return pretty
    
    def __format__(self, format_spec: str) -> str:
        return self.__str__()

    def __repr__(self):
        value = (
            "signature={}".format(self.signature),
            "machine={}".format(self.machine),
            "numberOfSections={}".format(self.numberOfSections),
            "timeDateStamp={}".format(
                file_time_to_datetime(self.timeDateStamp).strftime("%Y-%m-%d %H:%M:%S")
            ),
            "pointerToSymbolTable={}".format(self.pointerToSymbolTable),
            "numberOfSymbols={}".format(self.numberOfSymbols),
            "sizeOfOptionalHeader={}".format(self.sizeOfOptionalHeader),
            "characteristics={}".format(self.characteristics),
        )
        return "PEHeader({})".format(", ".join(value))
