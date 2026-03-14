import { resolveDefaultSchemaPaths, resolveInputSchemaPaths } from "./path-resolver";
import { mergeSchemaFiles } from "./merge-schema-files";
import { LoadedSchema } from "./types";

export function loadSchemaSDL(...schemaFiles: string[]): LoadedSchema {
  const resolvedSchemaFiles =
    schemaFiles.length > 0 ? resolveInputSchemaPaths(schemaFiles) : resolveDefaultSchemaPaths();

  return mergeSchemaFiles(resolvedSchemaFiles);
}
