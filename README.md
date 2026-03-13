# @connectingmatrix/graphql-parser

Simple TypeScript module for converting GraphQL queries into a plain object shape.

## Install from Git (HTTP)

```bash
yarn add https://github.com/connectingmatrix/graphql-parser.git
```

## Exported functions

- `parseQuery(query: string)`
- `parseJSON(payload: string | { query: string; variables?: object })`
- `parseOperation(query: string, variables?: object)`

## Output format

```ts
{
  operation: {
    name: "[OPERATION NAME]",
    type: "query | mutation",
    definition: { /* query converted into object */ },
    variable: { /* variables object */ }
  }
}
```

## Example

```ts
import { parseJSON } from "@connectingmatrix/graphql-parser";

const payload = {
  query:
    "query ChatContext($chatId: UUID!) { ai_chat_sessionsXsubjectXpostsCollection { edges { node { chat_session_id subject_id post_id } } } }",
  variables: {
    chatId: "3dc0c39c-cc72-433a-b03e-a67d2e43eacf"
  }
};

const parsed = parseJSON(payload);
console.log(parsed);
```
