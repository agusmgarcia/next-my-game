import { type Vector2Types } from "../Vector2";

export interface Readonly extends Vector2Types.Readonly {
  get z(): number;
}
