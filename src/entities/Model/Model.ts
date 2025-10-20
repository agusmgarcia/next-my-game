import { AnimationComponent, RenderComponent } from "#src/components";

import { Object } from "../Object";
import { type Options } from "./Model.types";

export default abstract class Model<TAnimations extends string> extends Object {
  constructor(options: Options<TAnimations>) {
    super();

    this.addComponent(
      new AnimationComponent<TAnimations>({
        animations: options.animations,
        initialAnimation: options.initialAnimation,
        spriteSheet: options.spriteSheet,
      }),
    );

    this.addComponent(
      new RenderComponent({
        map: options.map,
        normalMap: options.normalMap,
      }),
    );
  }

  get animation(): TAnimations {
    return this.components.getSingle(AnimationComponent<TAnimations>).animation;
  }

  setAnimation(id: TAnimations): void {
    this.components.getSingle(AnimationComponent<TAnimations>).setAnimation(id);
  }
}
