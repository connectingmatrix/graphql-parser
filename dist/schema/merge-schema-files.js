"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSchemaFiles = mergeSchemaFiles;
const node_fs_1 = __importDefault(require("node:fs"));
function mergeSchemaFiles(schemaPaths) {
    const fileStats = schemaPaths.map((schemaPath) => {
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
