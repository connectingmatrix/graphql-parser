"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = parseQuery;
exports.parseOperation = parseOperation;
const graphql_1 = require("graphql");
const types_1 = require("./types");
function parseQuery(query) {
    return parseOperation(query, {}, null);
}
function parseOperation(query, variables = {}, operationName = null) {
    const document = (0, graphql_1.parse)(query);
    const operation = document.definitions.find((definition) => definition.kind === graphql_1.Kind.OPERATION_DEFINITION
        && (!operationName || definition.name?.value === operationName));
    if (!operation) {
        throw new Error("No GraphQL operation found in query.");
    }
    const type = normalizeOperationType(operation.operation);
    return {
        operation: {
            name: operation.name?.value ?? "AnonymousOperation",
            type,
            variable: variables,
            fields: readFields(operation, type)
        }
    };
}
function readFields(operation, type) {
    const fields = [];
    for (const selection of operation.selectionSet.selections) {
        if (selection.kind !== graphql_1.Kind.FIELD) {
            continue;
        }
        fields.push({
            key: selection.alias?.value || selection.name.value,
            name: selection.name.value,
            operation: type
        });
    }
    return fields;
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
