import * as Three from "three";

import { LightComponent } from "../LightComponent";
import { type Options } from "./DirectionalLightComponent.types";

export default class DirectionalLightComponent extends LightComponent<Three.DirectionalLight> {
  constructor(options?: Partial<Options>) {
    super(
      new Three.DirectionalLight(
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
