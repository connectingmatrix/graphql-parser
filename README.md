# @connectingmatrix/graphql-parser

TypeScript module for loading and merging GraphQL SDL files.

## Install from Git (HTTP)

```bash
yarn add https://github.com/connectingmatrix/graphql-parser.git
```

## Exported functions

- `loadSchemaSDL(...schemaFiles: string[])`
- `GraphQLOperationType` (`GraphQLOperationType.MUTATION | GraphQLOperationType.QUERY`)
- `resolver(path: string, operationType: GraphQLOperationType)`
- `getCustomResolver(container: unknown, operationType: GraphQLOperationType)`
- `OperationType` (`OperationType.QUERY | OperationType.MUTATION`)
- `parseJSON(payload: string | { query: string; variables?: object })`
- `parseQuery(query: string)`
- `parseOperation(query: string, variables?: ParsedVariables)`

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

## Query parser output

`parseJSON` / `parseQuery` / `parseOperation` return:

```ts
{
  operation: {
    name: "[OPERATION NAME]",
    type: "query | mutation",
    variable: { /* variables object */ }
  }
}
```

`parseJSON` accepts both:
- JSON payload (`{ query, variables }`) as object or JSON string
- Raw GraphQL query string (for example `"mutation AuthLogin(...) { ... }"`)

It returns `null` when parsing fails or input is invalid.

## Default resolution when no files are passed

When called as `loadSchemaSDL()` with no arguments, it tries:

1. Base schema:
   - `GRAPHQL_SCHEMA_PATH`
   - `./schema.graphql`
2. Extended schema:
   - `GRAPHQL_SCHEMA_EXTENDED_PATH`
   - `schema-extended.graphql` next to the base schema
   - `./schema-extended.graphql`
