"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = parseQuery;
exports.parseJSON = parseJSON;
exports.parseOperation = parseOperation;
const graphql_1 = require("graphql");
function parseQuery(query) {
    return parseOperation(query, {});
}
function parseJSON(payload) {
    const parsedPayload = typeof payload === "string"
        ? JSON.parse(payload)
        : payload;
    if (!parsedPayload || typeof parsedPayload.query !== "string") {
        throw new Error("Invalid payload: expected an object with a query string.");
    }
    return parseOperation(parsedPayload.query, parsedPayload.variables ?? {});
}
function parseOperation(query, variables = {}) {
    const document = (0, graphql_1.parse)(query);
    const fragments = getFragmentMap(document.definitions);
    const operation = document.definitions.find((definition) => definition.kind === "OperationDefinition");
    if (!operation) {
        throw new Error("No GraphQL operation found in query.");
    }
    return {
        operation: {
            name: operation.name?.value ?? "AnonymousOperation",
            definition: selectionSetToObject(operation.selectionSet, fragments),
            variable: variables
        }
    };
}
function getFragmentMap(definitions) {
    const fragmentMap = {};
    for (const definition of definitions) {
        if (definition.kind === "FragmentDefinition") {
            fragmentMap[definition.name.value] = definition;
        }
    }
    return fragmentMap;
}
function selectionSetToObject(selectionSet, fragments) {
    const definition = {};
    for (const selection of selectionSet.selections) {
        mergeSelection(definition, selection, fragments);
    }
    return definition;
}
function mergeSelection(target, selection, fragments) {
    if (selection.kind === "Field") {
        const key = selection.alias?.value ?? selection.name.value;
        const value = selection.selectionSet
            ? selectionSetToObject(selection.selectionSet, fragments)
            : true;
        target[key] = mergeValues(target[key], value);
        return;
    }
    if (selection.kind === "InlineFragment") {
        const inlineDefinition = selectionSetToObject(selection.selectionSet, fragments);
        mergeDefinition(target, inlineDefinition);
        return;
    }
    const fragment = fragments[selection.name.value];
    if (!fragment) {
        return;
    }
    const fragmentDefinition = selectionSetToObject(fragment.selectionSet, fragments);
    mergeDefinition(target, fragmentDefinition);
}
function mergeDefinition(target, source) {
    for (const [key, value] of Object.entries(source)) {
        target[key] = mergeValues(target[key], value);
    }
}
function mergeValues(current, incoming) {
    if (current === undefined) {
        return incoming;
    }
    if (current === true || incoming === true) {
        return current === true ? incoming : current;
    }
    const merged = { ...current };
    for (const [key, value] of Object.entries(incoming)) {
        merged[key] = mergeValues(merged[key], value);
    }
    return merged;
}
