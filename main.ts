import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "summary.txt");

let body: string;
try {
  body = readFileSync(source, "utf8");
} catch {
  console.error(`missing summary.txt next to ${here}`);
  process.exit(1);
}

if (body.startsWith("\uFEFF")) body = body.slice(1);

import { mkdirSync, writeFileSync } from "node:fs";

const LIMIT = 2000;
const count = [...body].length;
if (count < 1 || count > LIMIT) {
  console.error(`summary.txt has ${count} characters; expected 1..${LIMIT}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.txt");
writeFileSync(dest, body, "utf8");
console.log(`copied ${count} characters to ${dest}`);
