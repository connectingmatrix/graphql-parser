import { parseOperation } from "./parse-operation";
import { GraphQLJSONPayload, ParsedResult } from "./types";

export function parseJSON(payload: string | GraphQLJSONPayload): ParsedResult {
  const parsedPayload =
    typeof payload === "string"
      ? (JSON.parse(payload) as GraphQLJSONPayload)
      : payload;

  if (!parsedPayload || typeof parsedPayload.query !== "string") {
    throw new Error("Invalid payload: expected an object with a query string.");
  }

  return parseOperation(parsedPayload.query, parsedPayload.variables ?? {});
}
