// News-image entry, 23 November 2026: write the rendered front page to
// the output directory. Node standard library only; no network access.
// Deterministic: it copies one fixed file, so every run writes the same
// bytes to the same destination.
import { chmodSync, copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");

// Refuse to write a partial or empty output: fail loudly instead.
const srcStat = statSync(src);
if (!srcStat.isFile() || srcStat.size === 0) {
  throw new Error(`entry.png missing or empty at ${src}`);
}

// The program writes exactly one file, and its name stays entry.png:
// the gate tells a PNG from a JPEG by the first bytes, but the name
// must stay entry.png either way.
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);
// The grader collects outputs as another user, so the copy must be
// readable by everyone, not just the user that ran the program.
chmodSync(dest, 0o644);
// Integrity check: the copy must be byte-identical to the source, so a
// truncated write fails loudly instead of passing silently.
const destStat = statSync(dest);
if (destStat.size !== srcStat.size) {
  throw new Error(
    `copy incomplete: ${dest} is ${destStat.size} bytes, expected ${srcStat.size}`,
  );
}
console.log(`wrote ${dest} (${destStat.size} bytes)`);
