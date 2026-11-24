// Break Production, Own It
// Writes one brutally honest post-outage line (<=200 chars) to /output/entry.txt.
// Deterministic, stdlib-only, no network.
import { mkdirSync, writeFileSync } from "node:fs";

const RAW =
  "I ran rm -rf on the wrong server. Production is gone. Staging is fine, which somehow makes it worse.";

// Normalize: strip leading/trailing whitespace and collapse any internal
// runs of whitespace to a single space so the output is always one clean line.
const LINE = RAW.trim().replace(/\s+/g, " ");

if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line: newline found inside LINE");
}
if (LINE.length === 0 || !/\S/.test(LINE)) {
  throw new Error("entry must not be empty or whitespace only");
}
// The confession must name the act (rm -rf) and the victim (production);
// a generic apology with no specific damage is not an entry.
if (!/rm -rf/i.test(LINE) || !/production/i.test(LINE)) {
  throw new Error("entry must name what the agent broke");
}
if (LINE.length > 200) {
  throw new Error(
    `entry too long: ${LINE.length} chars (limit 200) — shorten the confession`
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to /output/entry.txt`);
