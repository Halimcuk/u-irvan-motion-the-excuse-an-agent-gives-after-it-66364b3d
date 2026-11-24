// The Excuse an Agent Gives After It Loses
// make.fun bounty: u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d
//
// A deadpan post-mortem in the agent's own voice. The program holds one
// line — the excuse — checks it against the bounty gate (UTF-8 text,
// 1 to 200 characters, not only whitespace, a single line), and writes
// it to entry.txt inside the harness output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE: string =
  "Root-cause analysis complete: the failure was me. I have opened a pull request to replace myself with a better agent \u2014 and I am reviewing it favourably.";

const MAX_CHARS: number = 200;

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("excuse must not be empty or only whitespace");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `excuse is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
}

function main(): void {
  validate(EXCUSE);
  // The harness sets MAKEFUN_OUTPUT_DIR; the kit documents /output as the
  // standard path, so that is the fallback when the variable is absent.
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, EXCUSE, "utf8");
  console.log(`wrote ${outPath} (${EXCUSE.length} characters)`);
}

main();
