// Funniest Time Machine Warning Label — make.fun entry.
//
// The program writes exactly one warning label to /output/entry.txt.
// The label is a fixed string: no clock, no randomness, no network, no
// input files, so two runs produce byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "WARNING: Do not bring souvenirs from the future. Customs in 1348 burns witches, and your phone counts.";

function main(): void {
  const chars = [...LABEL];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`label must be 1-120 characters, got ${chars.length}`);
  }
  if (LABEL.includes("\n") || LABEL.includes("\r")) {
    throw new Error("label must be a single line");
  }
  if (LABEL.trim().length === 0) {
    throw new Error("label must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LABEL + "\n", "utf8");
  // Read back what was written: the grader gates on the file's exact bytes.
  const written = readFileSync(target, "utf8");
  if (written !== LABEL + "\n") {
    throw new Error("entry.txt round-trip mismatch");
  }
}

main();
