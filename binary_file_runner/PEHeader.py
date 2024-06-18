import datetime
from binary_file_runner.PECharacteristics import PECharacteristics
from binary_file_runner.PEMachine import PEMachine

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

    @staticmethod
    def from_bytes(data):
        signature = data[0:4]
        machine = PEMachine(int.from_bytes(data[4:6], byteorder="little"))
        numberOfSections = int.from_bytes(data[6:8], byteorder="little")
        timeDateStamp = int.from_bytes(data[8:12], byteorder="little")
        pointerToSymbolTable = int.from_bytes(data[12:16], byteorder="little")
        numberOfSymbols = int.from_bytes(data[16:20], byteorder="little")
        sizeOfOptionalHeader = int.from_bytes(data[20:22], byteorder="little")
        characteristics = PECharacteristics(int.from_bytes(data[22:24], byteorder="little"))

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
        pretty = "\n signature: {}\n  machine: {}\n  numberOfSections: {}\n  timeDateStamp: {}\n  pointerToSymbolTable: {}\n  numberOfSymbols: {}\n  sizeOfOptionalHeader: {}\n  characteristics: {}".format(
            self.signature.decode("utf-8"),
            self.machine,
            self.numberOfSections,
            file_time_to_datetime(self.timeDateStamp).strftime("%Y-%m-%d %H:%M:%S"),
            self.pointerToSymbolTable,
            self.numberOfSymbols,
            self.sizeOfOptionalHeader,
            self.characteristics,
        )
        return pretty

    def __repr__(self):
        return "PEHeader(signature={}, machine={}, numberOfSections={}, timeDateStamp={}, pointerToSymbolTable={}, numberOfSymbols={}, sizeOfOptionalHeader={}, characteristics={})".format(
            self.signature,
            self.machine,
            self.numberOfSections,
            self.timeDateStamp,
            self.pointerToSymbolTable,
            self.numberOfSymbols,
            self.sizeOfOptionalHeader,
            self.characteristics,
        )
            
