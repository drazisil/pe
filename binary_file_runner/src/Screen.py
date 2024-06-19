from binary_file_runner.src.CodePage_437 import CodePage_437


class Screen:
    def __init__(self, numColumns, numRows):
        self.numColumns = numColumns
        self.numRows = numRows
        self.frame_buffer = [[" "] * numColumns for _ in range(numRows)]

        self.code_page = CodePage_437()

        for y in range(numRows):
            for x in range(numColumns):
                pos = self.get_position(x, y)
                char = self.code_page.get_char(pos)
                self.frame_buffer[y][x] = char

    def get_position(self, columnIndex, rowIndex):
        print("Getting position for column={} and row={}".format(columnIndex, rowIndex))
        return columnIndex + rowIndex * self.numColumns

    def set_char(self, x, y, char):
        self.frame_buffer[y * self.numColumns + x] = char

    def clear(self):
        self.frame_buffer = [0] * (self.numColumns * self.numRows)
        self.frame_buffer = [[" "] * self.numColumns for _ in range(self.numRows)]

    def draw(self):
        print(
            "Drawing screen with width={} and height={}".format(
                self.numColumns, self.numRows
            )
        )
        for y in range(self.numRows):
            for x in range(self.numColumns):
                print(self.frame_buffer[y][x], end="")
            print()

    def __str__(self):
        return "Screen(width={}, height={})".format(self.numColumns, self.numRows)

    def __repr__(self):
        return "Screen(width={}, height={})".format(self.numColumns, self.numRows)
