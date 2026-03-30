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
        return parseDocument(maybeJSON, {}, null);
      }

      if (isGraphQLPayload(maybeJSON)) {
        return parseDocument(maybeJSON.query, maybeJSON.variables ?? {}, maybeJSON.operationName ?? null);
      }
    } catch {
      return parseDocument(input, {}, null);
    }

    return null;
  }

  if (!isGraphQLPayload(payload)) {
    return null;
  }

  return parseDocument(payload.query, payload.variables ?? {}, payload.operationName ?? null);
}

function isGraphQLPayload(value: unknown): value is GraphQLJSONPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as { query?: unknown };
  return typeof candidate.query === "string";
}

function parseDocument(
  query: string,
  variables: GraphQLJSONPayload["variables"],
  operationName: string | null
): ParsedResult | null {
  try {
    return parseOperation(query, variables ?? {}, operationName);
  } catch {
    return null;
  }
}
