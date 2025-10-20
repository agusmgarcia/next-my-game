import { TransformComponent } from "#src/components";
import { type Vector3Types } from "#src/utils";

import { Entity } from "../Entity";

export default abstract class Object extends Entity {
  constructor() {
    super();

    this.addComponent(new TransformComponent());
  }

  get position(): Vector3Types.Readonly {
    return this.components.getSingle(TransformComponent).position;
  }

  setPosition(vector: Vector3Types.Readonly): void;

  setPosition(x: number, y: number, z: number): void;

  setPosition(
    vectorOrX: Vector3Types.Readonly | number,
    y?: number,
    z?: number,
  ): void {
    this.components
      .getSingle(TransformComponent)
      .setPosition(
        typeof vectorOrX === "number" ? vectorOrX : vectorOrX.x,
        typeof vectorOrX === "number" ? y || 0 : vectorOrX.y,
        typeof vectorOrX === "number" ? z || 0 : vectorOrX.z,
      );
  }

  get up(): Vector3Types.Readonly {
    return this.components.getSingle(TransformComponent).up;
  }

  get front(): Vector3Types.Readonly {
    return this.components.getSingle(TransformComponent).front;
  }

  get right(): Vector3Types.Readonly {
    return this.components.getSingle(TransformComponent).right;
  }

  setRotation(x: number, y: number, z: number): void {
    this.components.getSingle(TransformComponent).setRotation(x, y, z);
  }

  lookAt(x: number, y: number, z: number): void {
    this.components.getSingle(TransformComponent).lookAt(x, y, z);
  }

  get scale(): Vector3Types.Readonly {
    return this.components.getSingle(TransformComponent).scale;
  }

  setScale(x: number, y: number, z: number): void {
    this.components.getSingle(TransformComponent).setScale(x, y, z);
  }
}
