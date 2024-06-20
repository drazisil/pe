class PESection:
    def __init__(self, name: str, data: bytes):
        self.name = name
        self.data = data

    @staticmethod
    def from_bytes(name: str, size: int, data: bytes):
        return PESection(name, data[:size])

    def __str__(self):
        pretty = f"\tname: {self.name}\n"
        pretty += f"\tdata length: {len(self.data)}\n"
        return pretty.replace("\t", "  ")

    def __repr__(self):
        return "PESection(name={}, data length={})".format(self.name, len(self.data))

    def __eq__(self, other):
        return self.name == other.name and self.data == other.data
