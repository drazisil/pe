import { PE } from "./PE";

const path = "/home/drazisil/Downloads/MCO/mcity.exe";

console.log("Hello World!");

const peHeaderManager = await PE.fromPath(path);

console.log("PE Header Manager created");
// console.log(peHeaderManager);
console.log("Running PE Header Manager");
console.log();

await peHeaderManager.run();
