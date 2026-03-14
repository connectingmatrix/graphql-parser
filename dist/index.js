"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolver = exports.getCustomResolvers = exports.getCustomResolver = void 0;
exports.loadSchemaSDL = loadSchemaSDL;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
var resolvers_1 = require("./resolvers");
Object.defineProperty(exports, "getCustomResolver", { enumerable: true, get: function () { return resolvers_1.getCustomResolver; } });
Object.defineProperty(exports, "getCustomResolvers", { enumerable: true, get: function () { return resolvers_1.getCustomResolvers; } });
Object.defineProperty(exports, "resolver", { enumerable: true, get: function () { return resolvers_1.resolver; } });
function loadSchemaSDL(...schemaFiles) {
    const resolvedSchemaFiles = schemaFiles.length > 0 ? resolveInputSchemaPaths(schemaFiles) : resolveDefaultSchemaPaths();
    const fileStats = resolvedSchemaFiles.map((schemaPath) => {
        if (!node_fs_1.default.existsSync(schemaPath)) {
            throw new Error(`GraphQL schema file not found: ${schemaPath}`);
        }
        return {
            path: schemaPath,
            stats: node_fs_1.default.statSync(schemaPath)
        };
    });
    const sdl = fileStats
        .map(({ path: schemaPath }) => node_fs_1.default.readFileSync(schemaPath, "utf8"))
        .join("\n");
    const cacheKey = fileStats
        .map(({ path: schemaPath, stats }) => `${schemaPath}:${stats.mtimeMs}`)
        .join("|");
    return {
        cacheKey,
        sdl
    };
}
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
