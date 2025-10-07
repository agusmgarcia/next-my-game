import * as Three from "three";

import { Vector3, type Vector3Types } from "#src/utils";

import { Component } from "../Component";
import { type Event } from "./TransformComponent.types";

export default class TransformComponent extends Component<Event> {
  private readonly _frontAux: Three.Vector3;
  private readonly _rightAux: Three.Vector3;

  constructor() {
    super({ single: true });

    this._frontAux = new Three.Vector3();
    this._rightAux = new Three.Vector3();
  }

  get position(): Vector3Types.Readonly {
    return new Vector3(this.entity["_raw"].position);
  }

  setPosition(x: number, y: number, z: number): void {
    this.entity["_raw"].position.set(x, y, z);

    this.notifyListeners({
      channel: "position",
      payload: undefined,
      source: this,
      type: "POSITION_CHANGED",
    });
  }

  get up(): Vector3Types.Readonly {
    return new Vector3(this.entity["_raw"].up);
  }

  get front(): Vector3Types.Readonly {
    return new Vector3(this.entity["_raw"].getWorldDirection(this._frontAux));
  }

  get right(): Vector3Types.Readonly {
    return new Vector3(
      this._rightAux.crossVectors(
        this.entity["_raw"].up,
        this.entity["_raw"].getWorldDirection(this._frontAux),
      ),
    );
  }

  setRotation(x: number, y: number, z: number): void {
    this.entity["_raw"].rotation.set(x, y, z);

    this.notifyListeners({
      channel: "rotation",
      payload: undefined,
      source: this,
      type: "ROTATION_CHANGED",
    });
  }

  lookAt(x: number, y: number, z: number): void {
    this.entity["_raw"].lookAt(x, y, z);

    this.notifyListeners({
      channel: "rotation",
      payload: undefined,
      source: this,
      type: "ROTATION_CHANGED",
    });
  }

  get scale(): Vector3Types.Readonly {
    return new Vector3(this.entity["_raw"].scale);
  }

  setScale(x: number, y: number, z: number): void {
    this.entity["_raw"].scale.set(x, y, z);

    this.notifyListeners({
      channel: "scale",
      payload: undefined,
      source: this,
      type: "SCALE_CHANGED",
    });
  }
}
