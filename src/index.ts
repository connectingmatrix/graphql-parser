import {
  DefinitionNode,
  DocumentNode,
  FragmentDefinitionNode,
  OperationDefinitionNode,
  SelectionNode,
  SelectionSetNode,
  parse
} from "graphql";

export type ParsedVariables = Record<string, unknown>;

export type QueryDefinitionValue = true | QueryDefinition;

export interface QueryDefinition {
  [field: string]: QueryDefinitionValue;
}

export interface ParsedResult {
  operation: {
    name: string;
    definition: QueryDefinition;
    variable: ParsedVariables;
  };
}

export interface GraphQLJSONPayload {
  query: string;
  variables?: ParsedVariables | null;
}

export function parseQuery(query: string): ParsedResult {
  return parseOperation(query, {});
}

export function parseJSON(payload: string | GraphQLJSONPayload): ParsedResult {
  const parsedPayload =
    typeof payload === "string"
      ? (JSON.parse(payload) as GraphQLJSONPayload)
      : payload;

  if (!parsedPayload || typeof parsedPayload.query !== "string") {
    throw new Error("Invalid payload: expected an object with a query string.");
  }

  return parseOperation(parsedPayload.query, parsedPayload.variables ?? {});
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
      definition: selectionSetToObject(operation.selectionSet, fragments),
      variable: variables
    }
  };
}

function getFragmentMap(
  definitions: readonly DefinitionNode[]
): Record<string, FragmentDefinitionNode> {
  const fragmentMap: Record<string, FragmentDefinitionNode> = {};

  for (const definition of definitions) {
    if (definition.kind === "FragmentDefinition") {
      fragmentMap[definition.name.value] = definition;
    }
  }

  return fragmentMap;
}

function selectionSetToObject(
  selectionSet: SelectionSetNode,
  fragments: Record<string, FragmentDefinitionNode>
): QueryDefinition {
  const definition: QueryDefinition = {};

  for (const selection of selectionSet.selections) {
    mergeSelection(definition, selection, fragments);
  }

  return definition;
}

function mergeSelection(
  target: QueryDefinition,
  selection: SelectionNode,
  fragments: Record<string, FragmentDefinitionNode>
): void {
  if (selection.kind === "Field") {
    const key = selection.alias?.value ?? selection.name.value;
    const value = selection.selectionSet
      ? selectionSetToObject(selection.selectionSet, fragments)
      : true;

    target[key] = mergeValues(target[key], value);
    return;
  }

  if (selection.kind === "InlineFragment") {
    const inlineDefinition = selectionSetToObject(selection.selectionSet, fragments);
    mergeDefinition(target, inlineDefinition);
    return;
  }

  const fragment = fragments[selection.name.value];
  if (!fragment) {
    return;
  }

  const fragmentDefinition = selectionSetToObject(fragment.selectionSet, fragments);
  mergeDefinition(target, fragmentDefinition);
}

function mergeDefinition(target: QueryDefinition, source: QueryDefinition): void {
  for (const [key, value] of Object.entries(source)) {
    target[key] = mergeValues(target[key], value);
  }
}

function mergeValues(
  current: QueryDefinitionValue | undefined,
  incoming: QueryDefinitionValue
): QueryDefinitionValue {
  if (current === undefined) {
    return incoming;
  }

  if (current === true || incoming === true) {
    return current === true ? incoming : current;
  }

  const merged: QueryDefinition = { ...current };
  for (const [key, value] of Object.entries(incoming)) {
    merged[key] = mergeValues(merged[key], value);
  }
  return merged;
}
