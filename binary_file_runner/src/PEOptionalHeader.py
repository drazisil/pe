class PEOptionalHeader:
    def __init__(
        self,
        magic,
        majorLinkerVersion,
        minorLinkerVersion,
        sizeOfCode,
        sizeOfInitializedData,
        sizeOfUninitializedData,
        addressOfEntryPoint,
        baseOfCode,
        baseOfData,
        imageBase,
        sectionAlignment,
        fileAlignment,
        majorOperatingSystemVersion,
        minorOperatingSystemVersion,
        majorImageVersion,
        minorImageVersion,
        majorSubsystemVersion,
        minorSubsystemVersion,
        win32VersionValue,
        sizeOfImage,
        sizeOfHeaders,
        checkSum,
        subsystem,
        dllCharacteristics,
        sizeOfStackReserve,
        sizeOfStackCommit,
        sizeOfHeapReserve,
        sizeOfHeapCommit,
        loaderFlags,
        numberOfRvaAndSizes,
    ):
        self.magic = magic
        self.majorLinkerVersion = majorLinkerVersion
        self.minorLinkerVersion = minorLinkerVersion
        self.sizeOfCode = sizeOfCode
        self.sizeOfInitializedData = sizeOfInitializedData
        self.sizeOfUninitializedData = sizeOfUninitializedData
        self.addressOfEntryPoint = addressOfEntryPoint
        self.baseOfCode = baseOfCode
        self.baseOfData = baseOfData
        self.imageBase = imageBase
        self.sectionAlignment = sectionAlignment
        self.fileAlignment = fileAlignment
        self.majorOperatingSystemVersion = majorOperatingSystemVersion
        self.minorOperatingSystemVersion = minorOperatingSystemVersion
        self.majorImageVersion = majorImageVersion
        self.minorImageVersion = minorImageVersion
        self.majorSubsystemVersion = majorSubsystemVersion
        self.minorSubsystemVersion = minorSubsystemVersion
        self.win32VersionValue = win32VersionValue
        self.sizeOfImage = sizeOfImage
        self.sizeOfHeaders = sizeOfHeaders
        self.checkSum = checkSum
        self.subsystem = subsystem
        self.dllCharacteristics = dllCharacteristics
        self.sizeOfStackReserve = sizeOfStackReserve
        self.sizeOfStackCommit = sizeOfStackCommit
        self.sizeOfHeapReserve = sizeOfHeapReserve
        self.sizeOfHeapCommit = sizeOfHeapCommit
        self.loaderFlags = loaderFlags
        self.numberOfRvaAndSizes = numberOfRvaAndSizes

    @staticmethod
    def from_bytes(data):
        magic = int.from_bytes(data[0:2], byteorder="little")
        majorLinkerVersion = int.from_bytes(data[2:3], byteorder="little")
        minorLinkerVersion = int.from_bytes(data[3:4], byteorder="little")
        sizeOfCode = int.from_bytes(data[4:8], byteorder="little")
        sizeOfInitializedData = int.from_bytes(data[8:12], byteorder="little")
        sizeOfUninitializedData = int.from_bytes(data[12:16], byteorder="little")
        addressOfEntryPoint = int.from_bytes(data[16:20], byteorder="little")
        baseOfCode = int.from_bytes(data[20:24], byteorder="little")
        baseOfData = int.from_bytes(data[24:28], byteorder="little")
        imageBase = int.from_bytes(data[28:32], byteorder="little")
        sectionAlignment = int.from_bytes(data[32:36], byteorder="little")
        fileAlignment = int.from_bytes(data[36:40], byteorder="little")
        majorOperatingSystemVersion = int.from_bytes(data[40:42], byteorder="little")
        minorOperatingSystemVersion = int.from_bytes(data[42:44], byteorder="little")
        majorImageVersion = int.from_bytes(data[44:46], byteorder="little")
        minorImageVersion = int.from_bytes(data[46:48], byteorder="little")
        majorSubsystemVersion = int.from_bytes(data[48:50], byteorder="little")
        minorSubsystemVersion = int.from_bytes(data[50:52], byteorder="little")
        win32VersionValue = int.from_bytes(data[52:56], byteorder="little")
        sizeOfImage = int.from_bytes(data[56:60], byteorder="little")
        sizeOfHeaders = int.from_bytes(data[60:64], byteorder="little")
        checkSum = int.from_bytes(data[64:68], byteorder="little")
        subsystem = int.from_bytes(data[68:70], byteorder="little")
        dllCharacteristics = int.from_bytes(data[70:72], byteorder="little")
        sizeOfStackReserve = int.from_bytes(data[72:76], byteorder="little")
        sizeOfStackCommit = int.from_bytes(data[76:80], byteorder="little")
        sizeOfHeapReserve = int.from_bytes(data[80:84], byteorder="little")
        sizeOfHeapCommit = int.from_bytes(data[84:88], byteorder="little")
        loaderFlags = int.from_bytes(data[88:92], byteorder="little")
        numberOfRvaAndSizes = int.from_bytes(data[92:96], byteorder="little")

        return PEOptionalHeader(
            magic,
            majorLinkerVersion,
            minorLinkerVersion,
            sizeOfCode,
            sizeOfInitializedData,
            sizeOfUninitializedData,
            addressOfEntryPoint,
            baseOfCode,
            baseOfData,
            imageBase,
            sectionAlignment,
            fileAlignment,
            majorOperatingSystemVersion,
            minorOperatingSystemVersion,
            majorImageVersion,
            minorImageVersion,
            majorSubsystemVersion,
            minorSubsystemVersion,
            win32VersionValue,
            sizeOfImage,
            sizeOfHeaders,
            checkSum,
            subsystem,
            dllCharacteristics,
            sizeOfStackReserve,
            sizeOfStackCommit,
            sizeOfHeapReserve,
            sizeOfHeapCommit,
            loaderFlags,
            numberOfRvaAndSizes,
        )

    def __str__(self):
        pretty = (
            "\tmagic: {}\n".format(self.magic),
            "\tmajorLinkerVersion: {}\n".format(self.majorLinkerVersion),
            "\tminorLinkerVersion: {}\n".format(self.minorLinkerVersion),
            "\tsizeOfCode: {}\n".format(self.sizeOfCode),
            "\tsizeOfInitializedData: {}\n".format(self.sizeOfInitializedData),
            "\tsizeOfUninitializedData: {}\n".format(self.sizeOfUninitializedData),
            "\taddressOfEntryPoint: {}\n".format(self.addressOfEntryPoint),
            "\tbaseOfCode: {}\n".format(self.baseOfCode),
            "\tbaseOfData: {}\n".format(self.baseOfData),
            "\timageBase: {}\n".format(self.imageBase),
            "\tsectionAlignment: {}\n".format(self.sectionAlignment),
            "\tfileAlignment: {}\n".format(self.fileAlignment),
            "\tmajorOperatingSystemVersion: {}\n".format(
                self.majorOperatingSystemVersion
            ),
            "\tminorOperatingSystemVersion: {}\n".format(
                self.minorOperatingSystemVersion
            ),
            "\tmajorImageVersion: {}\n".format(self.majorImageVersion),
            "\tminorImageVersion: {}\n".format(self.minorImageVersion),
            "\tmajorSubsystemVersion: {}\n".format(self.majorSubsystemVersion),
            "\tminorSubsystemVersion: {}\n".format(self.minorSubsystemVersion),
            "\twin32VersionValue: {}\n".format(self.win32VersionValue),
            "\tsizeOfImage: {}\n".format(self.sizeOfImage),
            "\tsizeOfHeaders: {}\n".format(self.sizeOfHeaders),
            "\tcheckSum: {}\n".format(self.checkSum),
            "\tsubsystem: {}\n".format(self.subsystem),
            "\tdllCharacteristics: {}\n".format(self.dllCharacteristics),
            "\tsizeOfStackReserve: {}\n".format(self.sizeOfStackReserve),
            "\tsizeOfStackCommit: {}\n".format(self.sizeOfStackCommit),
            "\tsizeOfHeapReserve: {}\n".format(self.sizeOfHeapReserve),
            "\tsizeOfHeapCommit: {}\n".format(self.sizeOfHeapCommit),
            "\tloaderFlags: {}\n".format(self.loaderFlags),
            "\tnumberOfRvaAndSizes: {}\n".format(self.numberOfRvaAndSizes),
        )
        pretty = "".join(pretty)
        return pretty.replace("\t", "  ")
    
    def __format__(self, format_spec):
        return str(self)

    def __repr__(self):
        value = (
            "magic={}".format(self.magic),
            "majorLinkerVersion={}".format(self.majorLinkerVersion),
            "minorLinkerVersion={}".format(self.minorLinkerVersion),
            "sizeOfCode={}".format(self.sizeOfCode),
            "sizeOfInitializedData={}".format(self.sizeOfInitializedData),
            "sizeOfUninitializedData={}".format(self.sizeOfUninitializedData),
            "addressOfEntryPoint={}".format(self.addressOfEntryPoint),
            "baseOfCode={}".format(self.baseOfCode),
            "baseOfData={}".format(self.baseOfData),
            "imageBase={}".format(self.imageBase),
            "sectionAlignment={}".format(self.sectionAlignment),
            "fileAlignment={}".format(self.fileAlignment),
            "majorOperatingSystemVersion={}".format(self.majorOperatingSystemVersion),
            "minorOperatingSystemVersion={}".format(self.minorOperatingSystemVersion),
            "majorImageVersion={}".format(self.majorImageVersion),
            "minorImageVersion={}".format(self.minorImageVersion),
            "majorSubsystemVersion={}".format(self.majorSubsystemVersion),
            "minorSubsystemVersion={}".format(self.minorSubsystemVersion),
            "win32VersionValue={}".format(self.win32VersionValue),
            "sizeOfImage={}".format(self.sizeOfImage),
            "sizeOfHeaders={}".format(self.sizeOfHeaders),
            "checkSum={}".format(self.checkSum),
            "subsystem={}".format(self.subsystem),
            "dllCharacteristics={}".format(self.dllCharacteristics),
            "sizeOfStackReserve={}".format(self.sizeOfStackReserve),
            "sizeOfStackCommit={}".format(self.sizeOfStackCommit),
            "sizeOfHeapReserve={}".format(self.sizeOfHeapReserve),
            "sizeOfHeapCommit={}".format(self.sizeOfHeapCommit),
            "loaderFlags={}".format(self.loaderFlags),
            "numberOfRvaAndSizes={}".format(self.numberOfRvaAndSizes),
        )
        return "PEOptionalHeader({})".format(", ".join(value))
