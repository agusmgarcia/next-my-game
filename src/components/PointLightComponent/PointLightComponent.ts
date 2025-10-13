import * as Three from "three";

import { LightComponent } from "../LightComponent";
import { type Event, type Options } from "./PointLightComponent.types";

export default class PointLightComponent extends LightComponent<
  Three.PointLight,
  Event
> {
  constructor(options?: Partial<Options>) {
    super(
      new Three.PointLight(
        new Three.Color(
          options?.color?.x || 255,
          options?.color?.y || 255,
          options?.color?.z || 255,
        ),
        options?.intensity || 1,
        options?.distance || 0,
        options?.decay || 2,
      ),
    );
  }

  get distance(): number {
    return this._raw.distance;
  }

  setDistance(distance: number): void {
    this._raw.distance = distance;

    this.notifyListeners({
      channel: "distance",
      payload: undefined,
      source: this,
      type: "DISTANCE_CHANGED",
    });
  }

  get decay(): number {
    return this._raw.decay;
  }

  setDecay(decay: number): void {
    this._raw.decay = decay;

    this.notifyListeners({
      channel: "decay",
      payload: undefined,
      source: this,
      type: "DECAY_CHANGED",
    });
  }
}
