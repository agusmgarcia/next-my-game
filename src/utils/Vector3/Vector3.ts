import type * as Three from "three";

import { type Readonly } from "./Vector3.types";

export default class Vector3 implements Readonly {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor();

  constructor(instance: Three.Vector3 | Three.Color | Three.Euler);

  constructor(x: number, y: number, z: number);

  constructor(
    instanceOrX?: Three.Vector3 | Three.Color | Three.Euler | number,
    y?: number,
    z?: number,
  ) {
    this._x =
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? instanceOrX || 0
        : "x" in instanceOrX
          ? instanceOrX.x
          : instanceOrX.r;

    this._y =
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? y || 0
        : "x" in instanceOrX
          ? instanceOrX.y
          : instanceOrX.g;

    this._z =
      typeof instanceOrX === "number" || typeof instanceOrX === "undefined"
        ? z || 0
        : "x" in instanceOrX
          ? instanceOrX.z
          : instanceOrX.b;
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
