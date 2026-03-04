import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const outDir = join(process.cwd(), "out");
const filePath = join(outDir, ".nojekyll");

if (!existsSync(outDir)) {
  console.error("Expected static export in ./out. Run `npm run build` before creating .nojekyll.");
  process.exitCode = 1;
  process.exit(1);
}

const folder = dirname(filePath);
if (!existsSync(folder)) {
  mkdirSync(folder, { recursive: true });
}

writeFileSync(filePath, "");
console.log("Added .nojekyll to", filePath);
