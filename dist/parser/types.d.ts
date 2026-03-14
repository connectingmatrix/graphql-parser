export declare enum OperationType {
    QUERY = "query",
    MUTATION = "mutation"
}
export type ParsedVariables = Record<string, unknown>;
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
