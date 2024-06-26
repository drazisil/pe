class PEOptionalHeaderDataDirectory:
    def __init__(self, virtual_address, size):
        self.virtual_address = virtual_address
        self.size = size

    @staticmethod
    def from_bytes(data):
        virtual_address = int.from_bytes(data[0:4], byteorder="little")
        size = int.from_bytes(data[4:8], byteorder="little")
        return PEOptionalHeaderDataDirectory(virtual_address, size)

    def __str__(self):
        pretty = f"\tvirtual_address: {self.virtual_address}\n"
        pretty += f"\tsize: {self.size}\n"

        return pretty.replace("\t", "  ")

    def __repr__(self):
        return "PEOptionalHeaderDataDirectory(virtual_address={}, size={})".format(
            self.virtual_address, self.size
        )
