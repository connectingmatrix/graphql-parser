import { DefinitionNode, FragmentDefinitionNode, SelectionSetNode } from "graphql";
import { QueryDefinition } from "./types";
export declare function getFragmentMap(definitions: readonly DefinitionNode[]): Record<string, FragmentDefinitionNode>;
export declare function selectionSetToObject(selectionSet: SelectionSetNode, fragments: Record<string, FragmentDefinitionNode>): QueryDefinition;
