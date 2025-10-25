import { type System } from "#src/systems";
import { type ListTypes } from "#src/utils";

import type Scene from "./Scene";

export interface ReadonlySystemsList extends ListTypes.Readonly<System> {}

export type Event =
  | {
      channel: `system:${string}`;
      payload: System;
      source: Scene;
      type: "SYSTEM_ADDED";
    }
  | {
      channel: `system:${string}`;
      payload: System;
      source: Scene;
      type: "SYSTEM_REMOVED";
    };
