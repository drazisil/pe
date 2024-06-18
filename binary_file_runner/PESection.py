class PESection:
    def __init__(self, name, data):
        self.name = name
        self.data = data

    @staticmethod
    def from_bytes(name, size, data):
        return PESection(name, data[:size])

    def __str__(self):
        pretty = "name: {}\n  data length: {}\n".format(self.name, len(self.data))
        return pretty + "\n"

    def __repr__(self):
        return "PESection(name={}, data length={})".format(self.name, len(self.data))
