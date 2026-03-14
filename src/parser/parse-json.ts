import { parseOperation } from "./parse-operation";
import { GraphQLJSONPayload, ParsedResult } from "./types";

export function parseJSON(payload: string | GraphQLJSONPayload): ParsedResult | null {
  if (typeof payload === "string") {
    const input = payload.trim();
    if (!input) {
      return null;
    }

    try {
      const maybeJSON = JSON.parse(input) as unknown;

      if (typeof maybeJSON === "string") {
        return safeParseOperation(maybeJSON, {});
      }

      if (isGraphQLPayload(maybeJSON)) {
        return safeParseOperation(maybeJSON.query, maybeJSON.variables ?? {});
      }
    } catch {
      return safeParseOperation(input, {});
    }

    return null;
  }

  if (!isGraphQLPayload(payload)) {
    return null;
  }

  return safeParseOperation(payload.query, payload.variables ?? {});
}

function isGraphQLPayload(value: unknown): value is GraphQLJSONPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as { query?: unknown };
  return typeof candidate.query === "string";
}

function safeParseOperation(
  query: string,
  variables: GraphQLJSONPayload["variables"]
): ParsedResult | null {
  try {
    return parseOperation(query, variables ?? {});
  } catch {
    return null;
  }
}
