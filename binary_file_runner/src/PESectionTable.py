class PESectionTable:
    def __init__(
        self, name, virtual_size, virtual_address, size_of_raw_data, pointer_to_raw_data
    ):
        self.name = name
        self.virtual_size = virtual_size
        self.virtual_address = virtual_address
        self.size_of_raw_data = size_of_raw_data
        self.pointer_to_raw_data = pointer_to_raw_data

    @staticmethod
    def from_bytes(data):
        name = data[0:8].decode("utf-8").strip("\x00")
        virtual_size = int.from_bytes(data[8:12], byteorder="little")
        virtual_address = int.from_bytes(data[12:16], byteorder="little")
        size_of_raw_data = int.from_bytes(data[16:20], byteorder="little")
        pointer_to_raw_data = int.from_bytes(data[20:24], byteorder="little")
        return PESectionTable(
            name, virtual_size, virtual_address, size_of_raw_data, pointer_to_raw_data
        )

    def __str__(self):
        pretty = (
            "name: {}\n  ".format(self.name),
            "virtual_size: {}\n  ".format(self.virtual_size),
            "virtual_address: {}\n  ".format(self.virtual_address),
            "size_of_raw_data: {}\n  ".format(self.size_of_raw_data),
            "pointer_to_raw_data: {}\n".format(self.pointer_to_raw_data),
        )
        return "".join(pretty) + "\n"

    def __repr__(self):
        value = (
            "name={}".format(self.name),
            "virtual_size={}".format(self.virtual_size),
            "virtual_address={}".format(self.virtual_address),
            "size_of_raw_data={}".format(self.size_of_raw_data),
            "pointer_to_raw_data={}".format(self.pointer_to_raw_data),
        )
        return "PESectionTable({})".format(", ".join(value))
