import type * as Three from "three";

import { type Readonly } from "./Vector2.types";

export default class Vector2 implements Readonly {
  private _x: number;
  private _y: number;

  constructor();

  constructor(instance: Three.Vector2);

  constructor(x: number, y: number);

  constructor(instanceOrX?: Three.Vector2 | number, y?: number) {
    this._x =
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? instanceOrX || 0
        : instanceOrX.x;

    this._y =
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? y || 0
        : instanceOrX.y;
  }

  get x(): number {
    return this._x;
  }

  setX(x: number): void {
    this._x = x;
  }

  get y(): number {
    return this._y;
  }

  setY(y: number): void {
    this._y = y;
  }
}
