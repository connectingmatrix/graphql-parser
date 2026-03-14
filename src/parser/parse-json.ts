import { parseOperation } from "./parse-operation";
import { GraphQLJSONPayload, ParsedResult } from "./types";

export function parseJSON(payload: string | GraphQLJSONPayload): ParsedResult | null {
  let parsedPayload: GraphQLJSONPayload;

  if (typeof payload === "string") {
    try {
      parsedPayload = JSON.parse(payload) as GraphQLJSONPayload;
    } catch {
      return null;
    }
  } else {
    parsedPayload = payload;
  }

  if (!parsedPayload || typeof parsedPayload.query !== "string") {
    return null;
  }

  return parseOperation(parsedPayload.query, parsedPayload.variables ?? {});
}
