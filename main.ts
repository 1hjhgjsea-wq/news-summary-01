import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const src = join(dirname(fileURLToPath(import.meta.url)), "summary.txt");
let text: string;
try {
  text = readFileSync(src, "utf8");
} catch {
  console.error("summary.txt is missing next to main.ts");
  process.exit(1);
}
const len = Array.from(text).length;
if (len < 1 || len > 2000) {
  console.error(`summary.txt length ${len} is outside 1..2000 characters`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.txt"));
console.log(`copied ${len} characters`);