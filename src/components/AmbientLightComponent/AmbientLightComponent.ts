import * as Three from "three";

import { LightComponent } from "../LightComponent";
import { type Options } from "./AmbientLightComponent.types";

export default class AmbientLightComponent extends LightComponent<Three.AmbientLight> {
  constructor(options?: Partial<Options>) {
    super(
      new Three.AmbientLight(
        new Three.Color(
          options?.color?.x || 255,
          options?.color?.y || 255,
          options?.color?.z || 255,
        ),
        options?.intensity || 1,
      ),
    );
  }
}
