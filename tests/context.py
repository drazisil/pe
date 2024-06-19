import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import binary_file_runner
import binary_file_runner.src.PEHeader as PEHeader
import binary_file_runner.src.PEOptionalHeader as PEOptionalHeader
import binary_file_runner.src.PEOptionalHeaderDataDirectory as PEOptionalHeaderDataDirectory
import binary_file_runner.src.PESection as PESection