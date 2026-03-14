"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = parseQuery;
exports.parseOperation = parseOperation;
const graphql_1 = require("graphql");
const definition_builder_1 = require("./definition-builder");
const types_1 = require("./types");
function parseQuery(query) {
    return parseOperation(query, {});
}
function parseOperation(query, variables = {}) {
    const document = (0, graphql_1.parse)(query);
    const fragments = (0, definition_builder_1.getFragmentMap)(document.definitions);
    const operation = document.definitions.find((definition) => definition.kind === "OperationDefinition");
    if (!operation) {
        throw new Error("No GraphQL operation found in query.");
    }
    return {
        operation: {
            name: operation.name?.value ?? "AnonymousOperation",
            type: normalizeOperationType(operation.operation),
            definition: (0, definition_builder_1.selectionSetToObject)(operation.selectionSet, fragments),
            variable: variables
        }
    };
}
function normalizeOperationType(operationType) {
    if (operationType === "query") {
        return types_1.OperationType.QUERY;
    }
    if (operationType === "mutation") {
        return types_1.OperationType.MUTATION;
    }
    throw new Error(`Unsupported operation type: ${operationType}. Only query and mutation are supported.`);
}
