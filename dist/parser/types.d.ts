export declare enum OperationType {
    QUERY = "query",
    MUTATION = "mutation"
}
export type ParsedVariables = Record<string, unknown>;
export interface ParsedOperationField {
    key: string;
    name: string;
    operation: OperationType;
}
export interface ParsedResult {
    operation: {
        name: string;
        type: OperationType;
        variable: ParsedVariables;
        fields: ParsedOperationField[];
    };
}
export interface GraphQLJSONPayload {
    query: string;
    variables?: ParsedVariables | null;
    operationName?: string | null;
}
