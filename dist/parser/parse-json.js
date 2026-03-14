"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = parseJSON;
const parse_operation_1 = require("./parse-operation");
function parseJSON(payload) {
    let parsedPayload;
    if (typeof payload === "string") {
        try {
            parsedPayload = JSON.parse(payload);
        }
        catch {
            return null;
        }
    }
    else {
        parsedPayload = payload;
    }
    if (!parsedPayload || typeof parsedPayload.query !== "string") {
        return null;
    }
    return (0, parse_operation_1.parseOperation)(parsedPayload.query, parsedPayload.variables ?? {});
}
