import { OperationDefinitionNode, parse } from "graphql";
import { getFragmentMap, selectionSetToObject } from "./definition-builder";
import { OperationType, ParsedResult, ParsedVariables } from "./types";

export function parseQuery(query: string): ParsedResult {
  return parseOperation(query, {});
}

export function parseOperation(
  query: string,
  variables: ParsedVariables = {}
): ParsedResult {
  const document = parse(query);
  const fragments = getFragmentMap(document.definitions);

  const operation = document.definitions.find(
    (definition): definition is OperationDefinitionNode =>
      definition.kind === "OperationDefinition"
  );

  if (!operation) {
    throw new Error("No GraphQL operation found in query.");
  }

  return {
    operation: {
      name: operation.name?.value ?? "AnonymousOperation",
      type: normalizeOperationType(operation.operation),
      definition: selectionSetToObject(operation.selectionSet, fragments),
      variable: variables
    }
  };
}

function normalizeOperationType(
  operationType: OperationDefinitionNode["operation"]
): OperationType {
  if (operationType === "query") {
    return OperationType.QUERY;
  }

  if (operationType === "mutation") {
    return OperationType.MUTATION;
  }

  throw new Error(
    `Unsupported operation type: ${operationType}. Only query and mutation are supported.`
  );
}
