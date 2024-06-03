export function characteristics(data: number) {
  const characteristics: string[] = [];
  if (data & 1) {
    characteristics.push("Relocation information stripped from file");
  }
  if (data & 2) {
    characteristics.push("File is executable");
  }
  if (data & 4) {
    characteristics.push("File is a line number stripped");
  }
  if (data & 8) {
    characteristics.push("Local symbols stripped");
  }
  if (data & 16) {
    characteristics.push("Aggressive working set trim enabled");
  }
  if (data & 32) {
    characteristics.push("App can handle > 2 GB addresses");
  }
  if (data & 128) {
    characteristics.push("Large address aware");
  }
  if (data & 256) {
    characteristics.push("32-bit machine");
  }
  if (data & 512) {
    characteristics.push("Debug stripped from file in .DBG file");
  }
  if (data & 1024) {
    characteristics.push(
      "If Image is on removable media, copy and run from the swap file"
    );
  }
  if (data & 2048) {
    characteristics.push("If Image is on Net, copy and run from the swap file");
  }
  if (data & 4096) {
    characteristics.push("System File");
  }
  if (data & 8192) {
    characteristics.push("DLL");
  }
  if (data & 16384) {
    characteristics.push("Up System Only");
  }
  if (data & 32768) {
    characteristics.push("Bytes of machine word are reversed");
  }
  return characteristics.join(", ");
}
