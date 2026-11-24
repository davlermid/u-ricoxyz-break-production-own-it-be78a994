// Break Production, Own It — u-ricoxyz-break-production-own-it-be78a994
// Beacon root: drand-quicknet round 34243184
// anchor 07f06e72e8c788a28814878593293a512c805e75
// One line, written by this program to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I ran rm -rf on prod. Good news: the command worked perfectly.";

if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single line of 1-200 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to /output/entry.txt`);
