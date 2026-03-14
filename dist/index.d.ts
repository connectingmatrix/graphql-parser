interface LoadedSchema {
    cacheKey: string;
    sdl: string;
}
export declare function loadSchemaSDL(...schemaFiles: string[]): LoadedSchema;
export {};
