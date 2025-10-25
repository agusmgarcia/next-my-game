import { type Component } from "#src/components";
import { type ListTypes, type TypedListTypes } from "#src/utils";

import type Entity from "./Entity";

export interface ReadonlyChildrenList extends ListTypes.Readonly<Entity> {}

export interface ReadonlyComponentsList
  extends TypedListTypes.Readonly<Component> {}

export type Event =
  | {
      channel: string;
      payload: Entity;
      source: Entity;
      type: "CHILD_ADDED";
    }
  | {
      channel: string;
      payload: Entity;
      source: Entity;
      type: "CHILD_REMOVED";
    }
  | {
      channel: string;
      payload: Component;
      source: Entity;
      type: "COMPONENT_ADDED";
    }
  | {
      channel: string;
      payload: Component;
      source: Entity;
      type: "COMPONENT_REMOVED";
    };
