class PESection:
    def __init__(self, name: str, data: bytes):
        self.name = name
        self.data = data

    @staticmethod
    def from_bytes(name: str, size: int, data: bytes):
        return PESection(name, data[:size])

    def __str__(self):
        pretty = "name: {}\n  data length: {}\n".format(self.name, len(self.data))
        return pretty + "\n"

    def __repr__(self):
        return "PESection(name={}, data length={})".format(self.name, len(self.data))
    
    def __eq__(self, other):
        return self.name == other.name and self.data == other.data
