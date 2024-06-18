# Description: This file contains the BinaryFileRunner class which is responsible for reading a binary file and extracting the PE header, PE optional header, PE optional header data directories, PE section tables, and PE sections.


from binary_file_runner.src.PEHeader import PEHeader
from binary_file_runner.src.PEOptionalHeader import PEOptionalHeader
from binary_file_runner.src.PEOptionalHeaderDataDirectory import (
    PEOptionalHeaderDataDirectory,
)
from binary_file_runner.src.PESection import PESection
from binary_file_runner.src.PESectionTable import PESectionTable


class BinaryFileRunner:
    def __init__(
        self,
        pe_header,
        pe_optional_header,
        pe_optional_header_data_directories,
        pe_section_tables,
        pe_sections,
    ):
        self.pe_header = pe_header
        self.pe_optional_header = pe_optional_header
        self.pe_optional_header_data_directories = pe_optional_header_data_directories
        self.pe_section_tables = pe_section_tables
        self.pe_sections = pe_sections

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
        pass

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
