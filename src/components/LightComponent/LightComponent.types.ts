import type * as Three from "three";

import type LightComponent from "./LightComponent";

export type Event<TLight extends Three.Light> =
  | {
      channel: "color";
      payload: undefined;
      source: LightComponent<TLight>;
      type: "COLOR_CHANGED";
    }
  | {
      channel: "intensity";
      payload: undefined;
      source: LightComponent<TLight>;
      type: "INTENSITY_CHANGED";
    };
