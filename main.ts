import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const src = join(dirname(fileURLToPath(import.meta.url)), "summary.txt");
let bytes: Buffer;
try {
  bytes = readFileSync(src);
} catch {
  console.error("summary.txt is missing next to main.ts");
  process.exit(1);
}
if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
  bytes = bytes.subarray(3);
}
const len = Array.from(bytes.toString("utf8")).length;
if (len < 1 || len > 2000) {
  console.error(`summary.txt length ${len} is outside 1..2000 characters`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.txt");
writeFileSync(dest, bytes);
console.log(`copied ${len} characters to ${dest}`);