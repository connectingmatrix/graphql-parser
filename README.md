# @connectingmatrix/graphql-parser

TypeScript module for loading and merging GraphQL SDL files.

## Install from Git (HTTP)

```bash
yarn add https://github.com/connectingmatrix/graphql-parser.git
```

## Exported functions

- `loadSchemaSDL(...schemaFiles: string[])`
- `resolver(path: string, operationType: "MUTATION" | "QUERY")`
- `getCustomResolver(container: unknown, operationType: "MUTATION" | "QUERY")`

## Output format

```ts
{
  cacheKey: "[path:mtime|path:mtime|...]",
  sdl: "[merged schema SDL]"
}
```

## Example

```ts
import { loadSchemaSDL } from "@connectingmatrix/graphql-parser";

const merged = loadSchemaSDL("./schema.graphql", "./schema-extended.graphql", "./extra.graphql");
console.log(merged.cacheKey);
console.log(merged.sdl);
```

## Default resolution when no files are passed

When called as `loadSchemaSDL()` with no arguments, it tries:

1. Base schema:
   - `GRAPHQL_SCHEMA_PATH`
   - `./schema.graphql`
2. Extended schema:
   - `GRAPHQL_SCHEMA_EXTENDED_PATH`
   - `schema-extended.graphql` next to the base schema
   - `./schema-extended.graphql`
