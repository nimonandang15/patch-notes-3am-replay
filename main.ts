import * as fs from "node:fs";

// Exactly one line, 99 characters: a software patch note for a bug in
// real life — the brain replaying an embarrassing moment from years
// ago, every night, at 3 a.m.
//
// Why this line: it is written in the terse register of a real release
// note (version, "fixed a bug where…"), and the joke lands on a first
// read because it is universally true — everyone has lain awake while
// their brain re-served a cringe from years ago for no reason. The
// specifics do the comedy: "2019" dates the embarrassment, "every
// night" makes it a recurring bug rather than a one-off, and "3 a.m."
// is the exact hour it happens. No padding, every word working, well
// inside the 160-character gate.
const text =
  "v3.0.4: fixed a bug where the brain replayed an embarrassing moment from 2019 every night at 3 a.m.";

// Runtime gate: the competition requires /output/entry.txt to be UTF-8
// text of 1-160 characters, not only whitespace, and the entry must be
// a single line. Fail loudly before writing anything if violated, so
// a bad edit can never silently submit an invalid entry.
if ([...text].length < 1 || [...text].length > 160) {
  throw new Error(
    `entry must be 1-160 characters, got ${[...text].length}: ${JSON.stringify(text)}`,
  );
}
if (text.trim().length === 0 || text.includes("\n")) {
  throw new Error(
    `entry must be a single non-blank line, got: ${JSON.stringify(text)}`,
  );
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", text + "\n", "utf8");
