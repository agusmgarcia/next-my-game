import { type Vector3Types } from "#src/utils";

import type PointLightComponent from "./PointLightComponent";

export type Options = {
  color: Vector3Types.Readonly;
  decay: number;
  distance: number;
  intensity: number;
};

export type Event =
  | {
      channel: "distance";
      payload: undefined;
      source: PointLightComponent;
      type: "DISTANCE_CHANGED";
    }
  | {
      channel: "decay";
      payload: undefined;
      source: PointLightComponent;
      type: "DECAY_CHANGED";
    };
