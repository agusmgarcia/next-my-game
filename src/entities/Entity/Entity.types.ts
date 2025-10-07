import { type ListTypes } from "#src/utils";

import type Entity from "./Entity";

export interface ReadonlyChildrenList extends ListTypes.Readonly<Entity> {}

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
    };
