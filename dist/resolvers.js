"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomResolvers = exports.getCustomResolver = exports.resolverFn = exports.resolver = exports.GraphQLOperationType = void 0;
exports.GraphQLOperationType = {
    MUTATION: "MUTATION",
    QUERY: "QUERY",
};
const mutations = {};
const queries = {};
let closure = null;
const addResolver = (path, operationType, resolverFn) => {
    if (operationType === exports.GraphQLOperationType.MUTATION) {
        //@ts-ignore
        mutations[path] = resolverFn;
    }
    else {
        //@ts-ignore
        queries[path] = resolverFn;
    }
};
const resolver = (path, operationType) => (target, propertyName, _descriptor) => {
    if (typeof propertyName === "string" || typeof propertyName === "symbol") {
        const resolverFn = async (root, payload, context, info) => {
            if (!closure) {
                throw new Error("Resolvers configured improperly");
            }
            const service = closure.getService(target);
            const method = service[propertyName];
            if (method) {
                return method(payload, context);
            }
            throw new Error("Resolvers configured improperly");
        };
        addResolver(path, operationType, resolverFn);
        return;
    }
    if (typeof target === "function") {
        const resolverFn = async (root, payload, context, info) => {
            if (!closure) {
                throw new Error("Resolvers configured improperly");
            }
            return target(payload, context);
        };
        addResolver(path, operationType, resolverFn);
        return;
    }
    throw new Error("Resolver decorator was used with unsupported arguments");
};
exports.resolver = resolver;
const resolverFn = (path, operationType) => (handler) => {
    const runtimeResolver = async (root, payload, context, info) => handler(payload, context);
    addResolver(path, operationType, runtimeResolver);
    return handler;
};
exports.resolverFn = resolverFn;
const getCustomResolver = (some, operationType) => {
    closure = some;
    return operationType === exports.GraphQLOperationType.MUTATION
        ? { ...mutations }
        : { ...queries };
};
exports.getCustomResolver = getCustomResolver;
exports.getCustomResolvers = exports.getCustomResolver;
