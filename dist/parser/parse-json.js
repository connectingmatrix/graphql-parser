"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = parseJSON;
const parse_operation_1 = require("./parse-operation");
function parseJSON(payload) {
    if (typeof payload === "string") {
        const input = payload.trim();
        if (!input) {
            return null;
        }
        try {
            const maybeJSON = JSON.parse(input);
            if (typeof maybeJSON === "string") {
                return parseDocument(maybeJSON, {}, null);
            }
            if (isGraphQLPayload(maybeJSON)) {
                return parseDocument(maybeJSON.query, maybeJSON.variables ?? {}, maybeJSON.operationName ?? null);
            }
        }
        catch {
            return parseDocument(input, {}, null);
        }
        return null;
    }
    if (!isGraphQLPayload(payload)) {
        return null;
    }
    return parseDocument(payload.query, payload.variables ?? {}, payload.operationName ?? null);
}
function isGraphQLPayload(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const candidate = value;
    return typeof candidate.query === "string";
}
function parseDocument(query, variables, operationName) {
    try {
        return (0, parse_operation_1.parseOperation)(query, variables ?? {}, operationName);
    }
    catch {
        return null;
    }
}
