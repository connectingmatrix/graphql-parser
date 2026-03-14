"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomResolvers = exports.getCustomResolver = exports.resolver = void 0;
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
            return service[propertyName](root, payload, context, info);
        }
        throw new Error("Resolvers configured improperly");
    };
    if (operationType === "MUTATION") {
        mutations[path] = resolverFn;
    }
    else {
        queries[path] = resolverFn;
    }
};
exports.resolver = resolver;
const getCustomResolver = (some, operationType) => {
    closure = some;
    return operationType === "MUTATION" ? { ...mutations } : { ...queries };
};
exports.getCustomResolver = getCustomResolver;
exports.getCustomResolvers = exports.getCustomResolver;
