import {
  DefinitionNode,
  FragmentDefinitionNode,
  SelectionNode,
  SelectionSetNode
} from "graphql";
import { QueryDefinition, QueryDefinitionValue } from "./types";

export function getFragmentMap(
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

export function selectionSetToObject(
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
