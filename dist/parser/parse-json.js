"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = parseJSON;
const parse_operation_1 = require("./parse-operation");
function parseJSON(payload) {
    const parsedPayload = typeof payload === "string"
        ? JSON.parse(payload)
        : payload;
    if (!parsedPayload || typeof parsedPayload.query !== "string") {
        throw new Error("Invalid payload: expected an object with a query string.");
    }
    return (0, parse_operation_1.parseOperation)(parsedPayload.query, parsedPayload.variables ?? {});
}
