# Description: This file contains the BinaryFileRunner class which is responsible for reading a binary file and extracting the PE header, PE optional header, PE optional header data directories, PE section tables, and PE sections.


from codecs import encode
from binary_file_runner.src.PEHeader import PEHeader
from binary_file_runner.src.PEOptionalHeader import PEOptionalHeader
from binary_file_runner.src.PEOptionalHeaderDataDirectory import (
    PEOptionalHeaderDataDirectory,
)
from binary_file_runner.src.PESection import PESection
from binary_file_runner.src.PESectionTable import PESectionTable

import tkinter as tk


class CodePage_437:
    def __init__(self):
        self.__code_page = [
            " ",
            "☺",
            "☻",
            "♥",
            "♦",
            "♣",
            "♠",
            "•",
            "◘",
            "○",
            "◙",
            "♂",
            "♀",
            "♪",
            "♫",
            "☼",
            "►",
            "◄",
            "↕",
            "‼",
            "¶",
            "§",
            "▬",
            "↨",
            "↑",
            "↓",
            "→",
            "←",
            "∟",
            "↔",
            "▲",
            "▼",
            " ",
            "!",
            '"',
            "#",
            "$",
            "%",
            "&",
            "'",
            "(",
            ")",
            "*",
            "+",
            ",",
            "-",
            ".",
            "/",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            ":",
            ";",
            "<",
            "=",
            ">",
            "?",
            "@",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "[",
            "\\",
            "]",
            "^",
            "_",
            "`",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "{",
            "|",
            "}",
            "~",
            "⌂",
            "Ç",
            "ü",
            "é",
            "â",
            "ä",
            "à",
            "å",
            "ç",
            "ê",
            "ë",
            "è",
            "ï",
            "î",
            "ì",
            "Ä",
            "Å",
            "É",
            "æ",
            "Æ",
            "ô",
            "ö",
            "ò",
            "û",
            "ù",
            "ÿ",
            "Ö",
            "Ü",
            "¢",
            "£",
            "¥",
            "₧",
            "ƒ",
            "á",
            "í",
            "ó",
            "ú",
            "ñ",
            "Ñ",
            "ª",
            "º",
            "¿",
            "⌐",
            "¬",
            "½",
            "¼",
            "¡",
            "«",
            "»",
            "░",
            "▒",
            "▓",
            "│",
            "┤",
            "╡",
            "╢",
            "╖",
            "╕",
            "╣",
            "║",
            "╗",
            "╝",
            "╜",
            "╛",
            "┐",
            "└",
            "┴",
            "┬",
            "├",
            "─",
            "┼",
            "╞",
            "╟",
            "╚",
            "╔",
            "╩",
            "╦",
            "╠",
            "═",
            "╬",
            "╧",
            "╨",
            "╤",
            "╥",
            "╙",
            "╘",
            "╒",
            "╓",
            "╫",
            "╪",
            "┘",
            "┌",
            "█",
            "▄",
            "▌",
            "▐",
            "▀",
            "α",
            "ß",
            "Γ",
            "π",
            "Σ",
            "σ",
            "µ",
            "τ",
            "Φ",
            "Θ",
            "Ω",
            "δ",
            "∞",
            "φ",
            "ε",
            "∩",
            "≡",
            "±",
            "≥",
            "≤",
            "⌠",
            "⌡",
            "÷",
            "≈",
            "°",
            "∙",
            "·",
            "√",
            "ⁿ",
            "²",
            "■",
            " ",
        ]

    def get_char(self, i):
        print("Getting char for i={}".format(i))
        return self.__code_page[i] if i < len(self.__code_page) else "0"

    def __sizeof__(self) -> int:
        return len(self.__code_page)


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


class BinaryFileRunner(tk.Frame):
    def __init__(
        self,
        pe_header,
        pe_optional_header,
        pe_optional_header_data_directories,
        pe_section_tables,
        pe_sections,
        master=None,
    ):
        self.pe_header = pe_header
        self.pe_optional_header = pe_optional_header
        self.pe_optional_header_data_directories = pe_optional_header_data_directories
        self.pe_section_tables = pe_section_tables
        self.pe_sections = pe_sections
        self.screen = Screen(80, 25)
        
        tk.Frame.__init__(self, master)
        self.grid()
        tk.Label(self, text="Hello World!").grid(column=0, row=0)
        tk.Button(self, text="Quit", command=self.quit).grid(column=1, row=0)

    @staticmethod
    def from_path(path):
        with open(path, "rb") as file:
            pointer_to_pe_header = 0x3C
            file.seek(pointer_to_pe_header)
            pe_header_offset = int.from_bytes(file.read(4), byteorder="little")
            file.seek(pe_header_offset)
            pe_header = PEHeader.from_bytes(file.read(24))
            pe_optional_header = PEOptionalHeader.from_bytes(file.read(96))
            pe_optional_header_data_directories = []
            count_of_data_directories = pe_optional_header.numberOfRvaAndSizes
            for i in range(count_of_data_directories):
                pe_optional_header_data_directories.append(
                    PEOptionalHeaderDataDirectory.from_bytes(file.read(8))
                )
            pe_section_tables = []
            for i in range(pe_header.numberOfSections):
                pe_section_tables.append(PESectionTable.from_bytes(file.read(40)))

            pe_sections = []
            for i in range(len(pe_section_tables)):
                section = pe_section_tables[i]
                file.seek(section.pointer_to_raw_data)
                pe_sections.append(
                    PESection.from_bytes(
                        section.name,
                        section.size_of_raw_data,
                        file.read(section.size_of_raw_data),
                    )
                )
            return BinaryFileRunner(
                pe_header,
                pe_optional_header,
                pe_optional_header_data_directories,
                pe_section_tables,
                pe_sections,
            )

    def run(self):
        self.screen.draw()
        self.mainloop()

    def __str__(self):
        pretty = "PEHeader: {}\nPEOptionalHeader: {}\n".format(
            self.pe_header, self.pe_optional_header
        )
        pretty += "PEOptionalHeaderDataDirectories: \n"
        for directory in self.pe_optional_header_data_directories:
            pretty += "  {}".format(directory)
        pretty += "PESectionTables: \n"
        for table in self.pe_section_tables:
            pretty += "  {}".format(table)
        pretty += "PESections: \n"
        for section in self.pe_sections:
            pretty += "  {}".format(section)
        return pretty + "\n"

    def __repr__(self):
        return "BinaryFileRunner(pe_header={}, pe_optional_header={}, pe_optional_header_data_directories={}, pe_section_tables={}, pe_sections={})".format(
            self.pe_header,
            self.pe_optional_header,
            self.pe_optional_header_data_directories,
            self.pe_section_tables,
            self.pe_sections,
        )
