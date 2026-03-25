import { GraphQLResolveInfo } from "graphql";

export const GraphQLOperationType = {
  MUTATION: "MUTATION",
  QUERY: "QUERY",
} as const;

export type GraphQLOperationType =
  (typeof GraphQLOperationType)[keyof typeof GraphQLOperationType];

type ServiceMethod = (
  // root: string,
  payload: unknown,
  context: unknown,
  // info: GraphQLResolveInfo
) => unknown;

type RuntimeResolver = (
  root: string,
  payload: unknown,
  context: unknown,
  info: GraphQLResolveInfo,
) => unknown;

type ServiceContainer = {
  getService: (target: unknown) => Record<PropertyKey, ServiceMethod>;
};

const mutations: Record<string, RuntimeResolver> = {};
const queries: Record<string, RuntimeResolver> = {};

let closure: ServiceContainer | null = null;

const addResolver = (
  path: string,
  operationType: GraphQLOperationType,
  resolverFn: RuntimeResolver,
) => {
  if (operationType === GraphQLOperationType.MUTATION) {
    //@ts-ignore
    mutations[path] = resolverFn;
  } else {
    //@ts-ignore
    queries[path] = resolverFn;
  }
};

export const resolver =
  (path: string, operationType: GraphQLOperationType) =>
  (
    target: unknown,
    propertyName?: string | symbol | ServiceMethod,
    _descriptor?: PropertyDescriptor,
  ) => {
    if (typeof propertyName === "string" || typeof propertyName === "symbol") {
      const resolverFn = async (
        root: string,
        payload: unknown,
        context: unknown,
        info: GraphQLResolveInfo,
      ) => {
        if (!closure) {
          throw new Error("Resolvers configured improperly");
        }

        const service = closure.getService(target);
        const method = service[propertyName];
        if (method) {
          return method(payload, context);
        }

        throw new Error("Resolvers configured improperly");
      };

      addResolver(path, operationType, resolverFn);
      return;
    }

    if (typeof target === "function") {
      const resolverFn = async (
        root: string,
        payload: unknown,
        context: unknown,
        info: GraphQLResolveInfo,
      ) => {
        if (!closure) {
          throw new Error("Resolvers configured improperly");
        }

        return (target as ServiceMethod)(payload, context);
      };

      addResolver(path, operationType, resolverFn);
      return;
    }

    throw new Error("Resolver decorator was used with unsupported arguments");
  };

export const resolverFn =
  (path: string, operationType: GraphQLOperationType) =>
  (handler: ServiceMethod) => {
    const runtimeResolver = async (
      root: string,
      payload: unknown,
      context: unknown,
      info: GraphQLResolveInfo,
    ) => handler(payload, context);

    addResolver(path, operationType, runtimeResolver);
    return handler;
  };

export const getCustomResolver = (
  some: unknown,
  operationType: GraphQLOperationType,
) => {
  closure = some as ServiceContainer;
  return operationType === GraphQLOperationType.MUTATION
    ? { ...mutations }
    : { ...queries };
};

export const getCustomResolvers = getCustomResolver;
