import { type Vector3Types } from "#src/utils";

import type BoundingBoxComponent from "./BoundingBoxComponent";

export type Options = {
  offsetPosition: Vector3Types.Readonly;
  size: Vector3Types.Readonly;
};

export type Event =
  | {
      channel: "offsetPosition";
      payload: undefined;
      source: BoundingBoxComponent;
      type: "OFFSET_POSITION_CHANGED";
    }
  | {
      channel: "size";
      payload: undefined;
      source: BoundingBoxComponent;
      type: "SIZE_CHANGED";
    };
