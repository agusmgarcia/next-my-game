import { Vector3, type Vector3Types } from "#src/utils";

import { Component } from "../Component";
import { type Event, type Options } from "./BoundingBoxComponent.types";

export default class BoundingBoxComponent extends Component<Event> {
  private readonly _offsetPosition: Vector3;
  private readonly _size: Vector3;

  constructor(options?: Partial<Options>) {
    super({ single: true });

    this._offsetPosition = new Vector3(options?.offsetPosition);
    this._size = new Vector3(options?.size);
  }

  get offsetPosition(): Vector3Types.Readonly {
    return new Vector3(this._offsetPosition);
  }

  setOffsetPosition(x: number, y: number, z: number): void {
    this._offsetPosition.setX(x);
    this._offsetPosition.setY(y);
    this._offsetPosition.setZ(z);

    this.notifyListeners({
      channel: "offsetPosition",
      payload: undefined,
      source: this,
      type: "OFFSET_POSITION_CHANGED",
    });
  }

  get size(): Vector3Types.Readonly {
    return new Vector3(this._size);
  }

  setSize(x: number, y: number, z: number): void {
    this._size.setX(x);
    this._size.setY(y);
    this._size.setZ(z);

    this.notifyListeners({
      channel: "size",
      payload: undefined,
      source: this,
      type: "SIZE_CHANGED",
    });
  }
}
