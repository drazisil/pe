import unittest

from .context import PESection


class TestPESection(unittest.TestCase):
    def test_PESection(self):
        self.assertEqual(
            PESection.PESection("name", b"\x0102030405060708090a0b0c0d0e0f"),
            PESection.PESection.from_bytes(
                "name", 29, b"\x0102030405060708090a0b0c0d0e0f"
            ),
        )
