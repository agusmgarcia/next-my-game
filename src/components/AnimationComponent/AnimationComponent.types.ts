import { type SpriteSheetTypes } from "#src/utils";

import type AnimationComponent from "./AnimationComponent";

export type Options<TAnimations extends string> = {
  animations: SpriteSheetTypes.Readonly<TAnimations>["animations"];
  initialAnimation: TAnimations;
  spriteSheet: SpriteSheetTypes.Readonly<TAnimations>["spriteSheet"];
};

export type Event<TAnimations extends string> =
  | {
      channel: "index";
      payload: undefined;
      source: AnimationComponent<TAnimations>;
      type: "INDEX_CHANGED";
    }
  | {
      channel: "index";
      payload: undefined;
      source: AnimationComponent<TAnimations>;
      type: "ANIMATION_CHANGED";
    };
