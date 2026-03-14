import { GraphQLResolveInfo } from "graphql";
export type GraphQLOperationType = "MUTATION" | "QUERY";
type ServiceMethod = (root: string, payload: unknown, context: unknown, info: GraphQLResolveInfo) => unknown;
export declare const resolver: (path: string, operationType: GraphQLOperationType) => (target: unknown, propertyName: string) => void;
export declare const getCustomResolver: (some: unknown, operationType: GraphQLOperationType) => {
    [x: string]: ServiceMethod;
};
export declare const getCustomResolvers: (some: unknown, operationType: GraphQLOperationType) => {
    [x: string]: ServiceMethod;
};
export {};
