import fs from "node:fs";
import { LoadedSchema } from "./types";

export function mergeSchemaFiles(schemaPaths: string[]): LoadedSchema {
  const fileStats = schemaPaths.map((schemaPath) => {
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`GraphQL schema file not found: ${schemaPath}`);
    }

    return {
      path: schemaPath,
      stats: fs.statSync(schemaPath)
    };
  });

  const sdl = fileStats
    .map(({ path: schemaPath }) => fs.readFileSync(schemaPath, "utf8"))
    .join("\n");

  const cacheKey = fileStats
    .map(({ path: schemaPath, stats }) => `${schemaPath}:${stats.mtimeMs}`)
    .join("|");

  return {
    cacheKey,
    sdl
  };
}
