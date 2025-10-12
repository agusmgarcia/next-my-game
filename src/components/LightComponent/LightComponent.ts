import type * as Three from "three";

import { type Entity } from "#src/entities";
import { type ObservableTypes, Vector3, type Vector3Types } from "#src/utils";

import { Component } from "../Component";
import { type Event } from "./LightComponent.types";

export default abstract class LightComponent<
  TLight extends Three.Light,
  TEvent extends ObservableTypes.Event = any,
> extends Component<TEvent | Event<TLight>> {
  protected readonly _raw: TLight;

  protected constructor(raw: TLight) {
    super();

    this._raw = raw;
  }

  get color(): Vector3Types.Readonly {
    return new Vector3(this._raw.color);
  }

  setColor(red: number, green: number, blue: number): void {
    this._raw.color.setRGB(red, green, blue);

    this.notifyListeners({
      channel: "color",
      payload: undefined,
      source: this,
      type: "COLOR_CHANGED",
    });
  }

  get intensity(): number {
    return this._raw.intensity;
  }

  setIntensity(intensity: number): void {
    this._raw.intensity = intensity;

    this.notifyListeners({
      channel: "intensity",
      payload: undefined,
      source: this,
      type: "INTENSITY_CHANGED",
    });
  }

  protected override onEntityAttached(entity: Entity): void {
    entity["_raw"].add(this._raw);
  }

  protected override onEntityDetached(entity: Entity): void {
    entity["_raw"].remove(this._raw);
  }

  override dispose(): void {
    this._raw.dispose();
    super.dispose();
  }
}
