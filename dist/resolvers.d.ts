import { GraphQLResolveInfo } from "graphql";
export declare const GraphQLOperationType: {
    readonly MUTATION: "MUTATION";
    readonly QUERY: "QUERY";
};
export type GraphQLOperationType = (typeof GraphQLOperationType)[keyof typeof GraphQLOperationType];
type ServiceMethod = (payload: unknown, context: unknown) => unknown;
type RuntimeResolver = (root: string, payload: unknown, context: unknown, info: GraphQLResolveInfo) => unknown;
export declare const resolver: (path: string, operationType: GraphQLOperationType) => (target: unknown, propertyName?: string | symbol | ServiceMethod, _descriptor?: PropertyDescriptor) => void;
export declare const resolverFn: (path: string, operationType: GraphQLOperationType) => (handler: ServiceMethod) => ServiceMethod;
export declare const getCustomResolver: (some: unknown, operationType: GraphQLOperationType) => {
    [x: string]: RuntimeResolver;
};
export declare const getCustomResolvers: (some: unknown, operationType: GraphQLOperationType) => {
    [x: string]: RuntimeResolver;
};
export {};
