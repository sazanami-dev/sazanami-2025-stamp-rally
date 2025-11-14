import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const tsxCli = require.resolve("tsx/cli");

const suites: Array<{ name: string; pattern: string }> = [
  { name: "Achievement logic", pattern: "services/achievement/__tests__/**/*.test.ts" },
  { name: "Shared library logic", pattern: "lib/__tests__/**/*.test.ts" },
];

for (const suite of suites) {
  console.log(`\n▶ Running ${suite.name} (${suite.pattern})`);
  const result = spawnSync(process.execPath, [tsxCli, "--test", suite.pattern], {
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(`\n✖ ${suite.name} failed`);
    process.exit(result.status ?? 1);
  }
}

console.log("\n✓ All test suites completed successfully");
