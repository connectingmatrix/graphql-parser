export declare const GraphQLOperationType: {
    readonly MUTATION: "MUTATION";
    readonly QUERY: "QUERY";
};
export type GraphQLOperationType = (typeof GraphQLOperationType)[keyof typeof GraphQLOperationType];
type ServiceMethod = (payload: unknown, context: unknown) => unknown;
export declare const resolver: (path: string, operationType: GraphQLOperationType) => (target: unknown, propertyName: string) => void;
export declare const getCustomResolver: (some: unknown, operationType: GraphQLOperationType) => {
    [x: string]: ServiceMethod;
};
export declare const getCustomResolvers: (some: unknown, operationType: GraphQLOperationType) => {
    [x: string]: ServiceMethod;
};
export {};
