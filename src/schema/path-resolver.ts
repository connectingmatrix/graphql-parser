import fs from "node:fs";
import path from "node:path";

export function resolveInputSchemaPaths(schemaFiles: string[]): string[] {
  return schemaFiles.map((schemaPath) =>
    path.isAbsolute(schemaPath) ? schemaPath : path.resolve(process.cwd(), schemaPath)
  );
}

export function resolveDefaultSchemaPaths(): string[] {
  const schemaPath = resolveSchemaPath();
  const schemaExtendedPath = resolveSchemaExtendedPath(schemaPath);
  return [schemaPath, schemaExtendedPath];
}

function resolveSchemaPath(): string {
  const envPath = process.env.GRAPHQL_SCHEMA_PATH;
  const candidates = [envPath, path.resolve(process.cwd(), "schema.graphql")].filter(
    Boolean
  ) as string[];

  for (const schemaPath of candidates) {
    if (fs.existsSync(schemaPath)) {
      return schemaPath;
    }
  }

  throw new Error(
    "GraphQL schema file not found. Set GRAPHQL_SCHEMA_PATH or place schema.graphql in project root."
  );
}

function resolveSchemaExtendedPath(schemaPath: string): string {
  const envPath = process.env.GRAPHQL_SCHEMA_EXTENDED_PATH;
  const candidates = [
    envPath,
    path.resolve(path.dirname(schemaPath), "schema-extended.graphql"),
    path.resolve(process.cwd(), "schema-extended.graphql")
  ].filter(Boolean) as string[];

  for (const extensionPath of candidates) {
    if (fs.existsSync(extensionPath)) {
      return extensionPath;
    }
  }

  throw new Error(
    "GraphQL schema extension file not found. Set GRAPHQL_SCHEMA_EXTENDED_PATH or place schema-extended.graphql alongside schema.graphql."
  );
}
