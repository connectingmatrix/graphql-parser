export type ParsedVariables = Record<string, unknown>;
export type OperationType = "query" | "mutation";
export type QueryDefinitionValue = true | QueryDefinition;
export interface QueryDefinition {
    [field: string]: QueryDefinitionValue;
}
export interface ParsedResult {
    operation: {
        name: string;
        type: OperationType;
        definition: QueryDefinition;
        variable: ParsedVariables;
    };
}
export interface GraphQLJSONPayload {
    query: string;
    variables?: ParsedVariables | null;
}
export declare function parseQuery(query: string): ParsedResult;
export declare function parseJSON(payload: string | GraphQLJSONPayload): ParsedResult;
export declare function parseOperation(query: string, variables?: ParsedVariables): ParsedResult;
