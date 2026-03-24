"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomResolvers = exports.getCustomResolver = exports.resolver = exports.GraphQLOperationType = void 0;
exports.GraphQLOperationType = {
    MUTATION: "MUTATION",
    QUERY: "QUERY",
};
const mutations = {};
const queries = {};
let closure = null;
const resolver = (path, operationType) => (target, propertyName) => {
    const resolverFn = async (root, payload, context, info) => {
        if (!closure) {
            throw new Error("Resolvers configured improperly");
        }
        const service = closure.getService(target);
        if (service[propertyName]) {
            return service[propertyName](payload, context);
        }
        throw new Error("Resolvers configured improperly");
    };
    if (operationType === exports.GraphQLOperationType.MUTATION) {
        //@ts-ignore
        mutations[path] = resolverFn;
    }
    else {
        //@ts-ignore
        queries[path] = resolverFn;
    }
};
exports.resolver = resolver;
const getCustomResolver = (some, operationType) => {
    closure = some;
    return operationType === exports.GraphQLOperationType.MUTATION
        ? { ...mutations }
        : { ...queries };
};
exports.getCustomResolver = getCustomResolver;
exports.getCustomResolvers = exports.getCustomResolver;
