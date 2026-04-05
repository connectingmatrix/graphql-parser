# Architecture Context: graphql-parser

## Files

- `AGENTS.md`
- `README.md`

## Context Scripts

- None

## Content

File: README.md

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
- `resolverFn(path: string, operationType: GraphQLOperationType)`
- `resolver` can be used on class methods and `resolverFn` is for function-based resolvers.
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

```ts
import {
  resolver,
  resolverFn,
  GraphQLOperationType,
  getCustomResolver,
} from "@connectingmatrix/graphql-parser";

class UserResolver {
  @resolver("User.find", GraphQLOperationType.QUERY)
  find(_payload: unknown, _context: unknown) {
    return "class based";
  }
}

const queryResolvers = getCustomResolver(container, GraphQLOperationType.QUERY);

const queryUser = resolverFn("queryUser", GraphQLOperationType.QUERY)(
  (_payload: unknown, _context: unknown) => "function based",
);
```

## Query parser output

`parseJSON` / `parseQuery` / `
...

File: AGENTS.md

<!-- managed-by: PortableCoder -->

# AGENTS.md

## Working Agreement

- Codex Studio is the authoritative control surface for this repo.
- Continue + Ollama are secondary helpers and must follow the same repo rules and memory.
- Before major edits, read this file and run `./.ai/bin/ai-context`.
- Read `.ai/state/architecture-context.md` when the repo has system docs, context corpora, or script-based generators.
- When docs or generated context are stale, run `./.ai/bin/ai-context-build` before deeper implementation work.
- Keep the PortableCoder brain as the default route. Any Codex-backed execution must be explicitly unlocked for the current thread with `/brain allow codex`.
- After meaningful changes, run `./.ai/bin/ai-sync`.
- When a written plan is implemented, export that plan markdown to `~/dev/codex-plan/graphql-parser/[PLAN HEADING]-DATE-.md` and keep the original plan date in frontmatter and file timestamps.
- After prompt, standards, or memory updates, run `./.ai/bin/ai-memory-build`.
- On failures or broken validation, run `./.ai/bin/ai-repair`.
- If local-model features fail, run `cd /Users/abeer/dev/PortableCoder && ./tools/brain doctor` first.

## Repo Standards

- Prefer the smallest correct change over broad refactors.
- Preserve the repo's existing style, structure, and package manager.
- Avoid destructive git commands unless explicitly requested.
- Keep memory entries concise, factual, and tied to the files or behavior that changed.

## Repair Rules

- Inspect the latest failure memory before changing code.
- Inspect the latest summaries, patterns, and decisions before proposing a fix.
- Prefer minimal fixes that align with stored decisions and existing patterns.
- Record root cause, fix path, and validation outcome after repair work.

## Validation E
...
