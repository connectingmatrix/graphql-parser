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
                return safeParseOperation(maybeJSON, {});
            }
            if (isGraphQLPayload(maybeJSON)) {
                return safeParseOperation(maybeJSON.query, maybeJSON.variables ?? {});
            }
        }
        catch {
            return safeParseOperation(input, {});
        }
        return null;
    }
    if (!isGraphQLPayload(payload)) {
        return null;
    }
    return safeParseOperation(payload.query, payload.variables ?? {});
}
function isGraphQLPayload(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const candidate = value;
    return typeof candidate.query === "string";
}
function safeParseOperation(query, variables) {
    try {
        return (0, parse_operation_1.parseOperation)(query, variables ?? {});
    }
    catch {
        return null;
    }
}
