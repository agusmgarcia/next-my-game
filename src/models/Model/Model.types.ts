import {
  type AnimationComponentTypes,
  type RenderComponentTypes,
} from "#src/components";

export type Options<TAnimations extends string> =
  AnimationComponentTypes.Options<TAnimations> & RenderComponentTypes.Options;
