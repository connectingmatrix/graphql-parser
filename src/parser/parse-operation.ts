import { Kind, OperationDefinitionNode, parse } from "graphql";
import { OperationType, ParsedOperationField, ParsedResult, ParsedVariables } from "./types";

export function parseQuery(query: string): ParsedResult {
  return parseOperation(query, {}, null);
}

export function parseOperation(
  query: string,
  variables: ParsedVariables = {},
  operationName: string | null = null
): ParsedResult {
  const document = parse(query);
  const operation = document.definitions.find(
    (definition): definition is OperationDefinitionNode =>
      definition.kind === Kind.OPERATION_DEFINITION
      && (!operationName || definition.name?.value === operationName)
  );

  if (!operation) {
    throw new Error("No GraphQL operation found in query.");
  }

  const type = normalizeOperationType(operation.operation);

  return {
    operation: {
      name: operation.name?.value ?? "AnonymousOperation",
      type,
      variable: variables,
      fields: readFields(operation, type)
    }
  };
}

function readFields(operation: OperationDefinitionNode, type: OperationType): ParsedOperationField[] {
  const fields: ParsedOperationField[] = [];
  for (const selection of operation.selectionSet.selections) {
    if (selection.kind !== Kind.FIELD) {
      continue;
    }
    fields.push({
      key: selection.alias?.value || selection.name.value,
      name: selection.name.value,
      operation: type
    });
  }
  return fields;
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
