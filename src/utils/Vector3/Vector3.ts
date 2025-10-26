import type * as Three from "three";

import { Vector2 } from "../Vector2";
import { type Readonly } from "./Vector3.types";

export default class Vector3 extends Vector2 implements Readonly {
  private _z: number;

  constructor();

  constructor(instance: Three.Vector3 | Three.Color | Three.Euler);

  constructor(x: number, y: number, z: number);

  constructor(
    instanceOrX?: Three.Vector3 | Three.Color | Three.Euler | number,
    y?: number,
    z?: number,
  ) {
    super(
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? instanceOrX || 0
        : "x" in instanceOrX
          ? instanceOrX.x
          : instanceOrX.r,
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? y || 0
        : "x" in instanceOrX
          ? instanceOrX.y
          : instanceOrX.g,
    );

    this._z =
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? z || 0
        : "x" in instanceOrX
          ? instanceOrX.z
          : instanceOrX.b;
  }

  get z(): number {
    return this._z;
  }

  setZ(z: number): void {
    this._z = z;
  }

  static add(vector1: Readonly, vector2: Readonly): Vector3 {
    return new Vector3(
      vector1.x + vector2.x,
      vector1.y + vector2.y,
      vector1.z + vector2.z,
    );
  }

  static multiply(vector: Readonly, scalar: number): Vector3 {
    return new Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
  }
}
