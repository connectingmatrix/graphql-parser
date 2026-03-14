"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchemaSDL = loadSchemaSDL;
const path_resolver_1 = require("./path-resolver");
const merge_schema_files_1 = require("./merge-schema-files");
function loadSchemaSDL(...schemaFiles) {
    const resolvedSchemaFiles = schemaFiles.length > 0 ? (0, path_resolver_1.resolveInputSchemaPaths)(schemaFiles) : (0, path_resolver_1.resolveDefaultSchemaPaths)();
    return (0, merge_schema_files_1.mergeSchemaFiles)(resolvedSchemaFiles);
}
