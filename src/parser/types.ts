export enum OperationType {
  QUERY = "query",
  MUTATION = "mutation"
}

export type ParsedVariables = Record<string, unknown>;

export interface ParsedResult {
  operation: {
    name: string;
    type: OperationType;
    variable: ParsedVariables;
  };
}

export interface GraphQLJSONPayload {
  query: string;
  variables?: ParsedVariables | null;
}
