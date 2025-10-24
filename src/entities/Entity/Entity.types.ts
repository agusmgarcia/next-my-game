import { type Component } from "#src/components";
import { type ListTypes, type TypedListTypes } from "#src/utils";

import type Entity from "./Entity";

export interface ReadonlyChildrenList extends ListTypes.Readonly<Entity> {}

export interface ReadonlyComponentsList
  extends TypedListTypes.Readonly<Component> {}

export type Event =
  | {
      channel: `child:${string}`;
      payload: Entity;
      source: Entity;
      type: "CHILD_ADDED";
    }
  | {
      channel: `child:${string}`;
      payload: Entity;
      source: Entity;
      type: "CHILD_REMOVED";
    }
  | {
      channel: `component:${string}`;
      payload: Component;
      source: Entity;
      type: "COMPONENT_ADDED";
    }
  | {
      channel: `component:${string}`;
      payload: Component;
      source: Entity;
      type: "COMPONENT_REMOVED";
    };
