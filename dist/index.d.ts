export { getCustomResolver, getCustomResolvers, resolver } from "./resolvers";
export type { GraphQLOperationType } from "./resolvers";
interface LoadedSchema {
    cacheKey: string;
    sdl: string;
}
export declare function loadSchemaSDL(...schemaFiles: string[]): LoadedSchema;
