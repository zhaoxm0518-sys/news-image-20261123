// news-image-20261123 — the entry point for this bounty.
//
// The entry itself is one picture: entry.png, which sits in this same
// directory. This program does nothing clever; it simply puts a copy of
// that picture where the harness looks for the result, so what gets
// judged is exactly the image that was rendered for the day.

import { copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The folder this file lives in — entry.png is right beside it.
const HERE = dirname(fileURLToPath(import.meta.url));
const PICTURE = join(HERE, "entry.png");

async function main(): Promise<void> {
  // Where the harness wants the output. MAKEFUN_OUTPUT_DIR is set by
  // the runner; when it is absent we fall back to the harness default.
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  const destination = join(outDir, "entry.png");

  // Make sure the picture is actually there before doing anything else.
  const picture = await stat(PICTURE).catch(() => null);
  if (picture === null) {
    console.error(`missing picture: ${PICTURE} does not exist, nothing to copy`);
    process.exit(1);
  }
  if (!picture.isFile()) {
    console.error(`not a picture file: ${PICTURE} exists but is not a regular file`);
    process.exit(1);
  }

  // Create the output folder if the runner has not made it yet.
  await mkdir(outDir, { recursive: true });

  // Place the copy. If the copy itself fails, say so plainly and fail.
  try {
    await copyFile(PICTURE, destination);
  } catch (err) {
    console.error(`copy failed: could not place ${PICTURE} at ${destination}: ${err}`);
    process.exit(1);
  }

  console.log(`wrote ${destination} (${picture.size} bytes)`);
}

main().catch((err) => {
  console.error(`unexpected failure while copying the entry image: ${err}`);
  process.exit(1);
});
