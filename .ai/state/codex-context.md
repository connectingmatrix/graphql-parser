# Codex Context: graphql-parser

## Current Repo State

- Repo path: `giga/graphql-parser`
- Branch: `main`
- HEAD: `950683f6b8e2baa006ff16062f43ce912395784a`
- Dirty files: 4

## Required Preflight

- Read `AGENTS.md`
- Use stored patterns and decisions before proposing changes
- Run `./.ai/bin/ai-sync` after meaningful work
- Run `./.ai/bin/ai-repair` for broken states or failed validation

## Validation Commands

- `npm run test`
- `npm run build`

## Architectural Context Inputs

- `AGENTS.md`
- `README.md`

## Current Worktree

- `M package.json`
- `?? .ai/`
- `?? .continue/`
- `?? AGENTS.md`

## Recent Commits

- 950683f feat: parse named operations and root fields
- b65dbbb feat: add resolverFn for function-style resolvers
- 93339d7 Fixes
- 138d21f feat: let parseJSON parse raw GraphQL query strings
- 9f394e5 refactor: remove definition mapping and make parseJSON null-safe

## Architecture Context

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

## Latest Memory

---
id: graphql-parser--2a787a0b-20260405T120642Z-summary
type: summary
project: graphql-parser--2a787a0b
timestamp: 2026-04-05T12:06:42.118Z
branch: main
commit: 950683f6b8e2baa006ff16062f43ce912395784a
summary: Updated AGENTS and brain prompts with codex plan export rules.
tags: sync
files: ackage.json, .ai/, .continue/, AGENTS.md
relatedCommit: 950683f6b8e2baa006ff16062f43ce912395784a
---

# Meaningful change summary

Updated AGENTS and brain prompts with codex plan export rules.

- Changed files: ackage.json, .ai/, .continue/, AGENTS.md
- Branch: main
- HEAD: 950683f6b8e2baa006ff16062f43ce
...

---
id: graphql-parser--2a787a0b-20260405T120642Z-summary
type: summary
project: graphql-parser--2a787a0b
timestamp: 2026-04-05T12:06:42.324Z
branch: main
commit: 950683f6b8e2baa006ff16062f43ce912395784a
summary: Synchronized Codex thread 019d5d7b-ae9e-7ee2-aab7-416a8648f3d1 into shared project memory.
tags: codex-sync, session-sync
files: /Users/abeer/dev/giga/graphql-parser;, /Users/abeer/dev/giga/graphql-parser
relatedCommit: 
---

# Codex session sync

Codex session `019d5d7b-ae9e-7ee2-aab7-416a8648f3d1` synchronized into PortableCoder memory.

- Session file: /Users/abeer/.codex/sessions/
...

---
id: graphql-parser--2a787a0b-20260405T120535Z-summary
type: summary
project: graphql-parser--2a787a0b
timestamp: 2026-04-05T12:05:35.266Z
branch: main
commit: 950683f6b8e2baa006ff16062f43ce912395784a
summary: Bootstrapped repo-local AI scaffolding and initialized shared project memory.
tags: bootstrap, portablecoder
files: AGENTS.md, .continue/config.yaml, .ai/
relatedCommit: 950683f6b8e2baa006ff16062f43ce912395784a
---

# PortableCoder bootstrap

Repo initialized for PortableCoder.

- Repo: giga/graphql-parser
- Package manager: npm
- Validations recorded: npm run test, npm run build
- Br
...

## Latest Failure Memory

No failure memory recorded yet.

## Latest Transcript Memory

---
id: graphql-parser--2a787a0b-20260405T120642Z-transcript
type: transcript
project: graphql-parser--2a787a0b
timestamp: 2026-04-05T12:06:42.296Z
branch: main
commit: 950683f6b8e2baa006ff16062f43ce912395784a
summary: Captured the complete chronological user and Codex conversation for this thread.
tags: codex-sync, transcript
files: /Users/abeer/dev/giga/graphql-parser;, /Users/abeer/dev/giga/graphql-parser
relatedCommit: 
---

# Codex thread transcript

Codex thread transcript for `019d5d7b-ae9e-7ee2-aab7-416a8648f3d1`.

- Session file: /Users/abeer/.codex/sessions/2026/04/05/rollout-2026-04
...

## Patterns

---
id: graphql-parser--2a787a0b-20260405T120642Z-pattern
type: pattern
project: graphql-parser--2a787a0b
timestamp: 2026-04-05T12:06:42.377Z
branch: main
commit: 950683f6b8e2baa006ff16062f43ce912395784a
summary: Captured repeatable workflow patterns from the Codex thread.
tags: codex-sync, pattern
files: /Users/abeer/dev/giga/graphql-parser;, /Users/abeer/dev/giga/graphql-parser
relatedCommit: 
---

# Codex session working patterns

- - Continue + Ollama are secondary helpers and must follow the same repo rules and memory.
- - Before major edits, read this file and run `./.ai/bin/ai-context`.
...

## Decisions

---
id: graphql-parser--2a787a0b-20260405T120642Z-decision
type: decision
project: graphql-parser--2a787a0b
timestamp: 2026-04-05T12:06:42.350Z
branch: main
commit: 950683f6b8e2baa006ff16062f43ce912395784a
summary: Captured explicit working rules and approved defaults from the Codex thread.
tags: codex-sync, decision
files: /Users/abeer/dev/giga/graphql-parser;, /Users/abeer/dev/giga/graphql-parser
relatedCommit: 
---

# Codex session decisions

- - Codex Studio is the authoritative control surface for this repo.
- - Continue + Ollama are secondary helpers and must follow the same repo rules a
...
