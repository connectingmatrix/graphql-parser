import { ParsedResult, ParsedVariables } from "./types";
export declare function parseQuery(query: string): ParsedResult;
export declare function parseOperation(query: string, variables?: ParsedVariables, operationName?: string | null): ParsedResult;
