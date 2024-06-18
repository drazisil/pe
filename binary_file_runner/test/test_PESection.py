import unittest

from binary_file_runner.src.PESection import PESection


class TestPESection(unittest.TestCase):
    def test_PESection(self):
        self.assertEqual(
            PESection("name", b"\x0102030405060708090a0b0c0d0e0f"),
            PESection.from_bytes("name", 29, b"\x0102030405060708090a0b0c0d0e0f"),
        )
