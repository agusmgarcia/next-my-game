import { AmbientLightComponent } from "#src/components";
import { type Vector3Types } from "#src/utils";

import { Entity } from "../Entity";
import { type Options } from "./AmbientLight.types";

export default class AmbientLight extends Entity {
  constructor(options?: Partial<Options>) {
    super();
    this.addComponent(new AmbientLightComponent(options));
  }

  get color(): Vector3Types.Readonly {
    return this.components.getSingle(AmbientLightComponent).color;
  }

  setColor(red: number, green: number, blue: number): void {
    this.components.getSingle(AmbientLightComponent).setColor(red, green, blue);
  }

  get intensity(): number {
    return this.components.getSingle(AmbientLightComponent).intensity;
  }

  setIntensity(intensity: number): void {
    this.components.getSingle(AmbientLightComponent).setIntensity(intensity);
  }
}
