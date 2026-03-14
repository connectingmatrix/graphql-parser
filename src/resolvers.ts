import { GraphQLResolveInfo } from "graphql";

export const GraphQLOperationType = {
  MUTATION: "MUTATION",
  QUERY: "QUERY"
} as const;

export type GraphQLOperationType =
  (typeof GraphQLOperationType)[keyof typeof GraphQLOperationType];

type ServiceMethod = (
  root: string,
  payload: unknown,
  context: unknown,
  info: GraphQLResolveInfo
) => unknown;

type ServiceContainer = {
  getService: (target: unknown) => Record<string, ServiceMethod>;
};

const mutations: Record<string, ServiceMethod> = {};
const queries: Record<string, ServiceMethod> = {};

let closure: ServiceContainer | null = null;

export const resolver =
  (path: string, operationType: GraphQLOperationType) =>
  (target: unknown, propertyName: string) => {
    const resolverFn = async (
      root: string,
      payload: unknown,
      context: unknown,
      info: GraphQLResolveInfo
    ) => {
      if (!closure) {
        throw new Error("Resolvers configured improperly");
      }

      const service = closure.getService(target);
      if (service[propertyName]) {
        return service[propertyName](root, payload, context, info);
      }

      throw new Error("Resolvers configured improperly");
    };

    if (operationType === GraphQLOperationType.MUTATION) {
      mutations[path] = resolverFn;
    } else {
      queries[path] = resolverFn;
    }
  };

export const getCustomResolver = (
  some: unknown,
  operationType: GraphQLOperationType
) => {
  closure = some as ServiceContainer;
  return operationType === GraphQLOperationType.MUTATION
    ? { ...mutations }
    : { ...queries };
};

export const getCustomResolvers = getCustomResolver;
