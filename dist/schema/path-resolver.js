"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveInputSchemaPaths = resolveInputSchemaPaths;
exports.resolveDefaultSchemaPaths = resolveDefaultSchemaPaths;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function resolveInputSchemaPaths(schemaFiles) {
    return schemaFiles.map((schemaPath) => node_path_1.default.isAbsolute(schemaPath) ? schemaPath : node_path_1.default.resolve(process.cwd(), schemaPath));
}
function resolveDefaultSchemaPaths() {
    const schemaPath = resolveSchemaPath();
    const schemaExtendedPath = resolveSchemaExtendedPath(schemaPath);
    return [schemaPath, schemaExtendedPath];
}
function resolveSchemaPath() {
    const envPath = process.env.GRAPHQL_SCHEMA_PATH;
    const candidates = [envPath, node_path_1.default.resolve(process.cwd(), "schema.graphql")].filter(Boolean);
    for (const schemaPath of candidates) {
        if (node_fs_1.default.existsSync(schemaPath)) {
            return schemaPath;
        }
    }
    throw new Error("GraphQL schema file not found. Set GRAPHQL_SCHEMA_PATH or place schema.graphql in project root.");
}
function resolveSchemaExtendedPath(schemaPath) {
    const envPath = process.env.GRAPHQL_SCHEMA_EXTENDED_PATH;
    const candidates = [
        envPath,
        node_path_1.default.resolve(node_path_1.default.dirname(schemaPath), "schema-extended.graphql"),
        node_path_1.default.resolve(process.cwd(), "schema-extended.graphql")
    ].filter(Boolean);
    for (const extensionPath of candidates) {
        if (node_fs_1.default.existsSync(extensionPath)) {
            return extensionPath;
        }
    }
    throw new Error("GraphQL schema extension file not found. Set GRAPHQL_SCHEMA_EXTENDED_PATH or place schema-extended.graphql alongside schema.graphql.");
}
