import { type SpriteSheetTypes } from "#src/utils";

import { ScriptComponent } from "../ScriptComponent";
import { type Event, type Options } from "./AnimationComponent.types";

export default class AnimationComponent<
  TAnimations extends string,
> extends ScriptComponent<Event<TAnimations>> {
  private readonly _spriteSheet: SpriteSheetTypes.Readonly<TAnimations>["spriteSheet"];
  private readonly _animations: SpriteSheetTypes.Readonly<TAnimations>["animations"];
  private readonly _initialAnimation: TAnimations;

  private _animation: AnimationInstance<TAnimations> | undefined;

  constructor(options: Options<TAnimations>) {
    super({ single: true });

    this._spriteSheet = options.spriteSheet;
    this._animations = options.animations;
    this._initialAnimation = options.initialAnimation;

    this._animation = undefined;
  }

  get spriteSheet(): SpriteSheetTypes.Readonly<TAnimations>["spriteSheet"] {
    return this._spriteSheet;
  }

  get animations(): SpriteSheetTypes.Readonly<TAnimations>["animations"] {
    return this._animations;
  }

  get animation(): TAnimations {
    if (!this._animation)
      throw new Error(
        `Component '${this.constructor.name}' is not attached into any entity`,
      );

    return this._animation.id;
  }

  setAnimation(id: TAnimations): void {
    const animation = this._animations[id];
    if (!animation) throw new Error(`Animation '${id}' not found`);

    this._animation = {
      id,
      index: 0,
      mspf: 1000 / animation.fps,
      remainingMSPF: 0,
      sprites: animation.sprites,
    };

    this.setIndex(0, false);

    this.notifyListeners({
      channel: "index",
      payload: undefined,
      source: this,
      type: "ANIMATION_CHANGED",
    });
  }

  private clearAnimation(): void {
    this._animation = undefined;

    this.notifyListeners({
      channel: "index",
      payload: undefined,
      source: this,
      type: "ANIMATION_CHANGED",
    });
  }

  get index(): number {
    if (!this._animation)
      throw new Error(
        `Component '${this.constructor.name}' is not attached into any entity`,
      );

    return this._animation.index;
  }

  private setIndex(index: number, notify: boolean): void {
    if (!this._animation) return;

    this._animation.index = index;
    this._animation.remainingMSPF += this._animation.mspf;

    if (!notify) return;

    this.notifyListeners({
      channel: "index",
      payload: undefined,
      source: this,
      type: "INDEX_CHANGED",
    });
  }

  protected override onEntityAttached(): void {
    this.setAnimation(this._initialAnimation);
  }

  protected override onUpdate(deltaTime: number): void {
    if (!this._animation) return;
    if (this._animation.sprites.length < 2) return;

    if (this._animation.remainingMSPF > 0) {
      this._animation.remainingMSPF -= deltaTime;
      if (this._animation.remainingMSPF > 0) return;
    }

    this.setIndex(
      this._animation.index < this._animation.sprites.length - 1
        ? this._animation.index + 1
        : 0,
      true,
    );
  }

  protected override onEntityDetached(): void {
    this.clearAnimation();
  }
}

type AnimationInstance<TAnimations extends string> = Pick<
  SpriteSheetTypes.Readonly<TAnimations>["animations"][TAnimations],
  "sprites"
> & {
  id: TAnimations;
  index: number;
  mspf: number;
  remainingMSPF: number;
};
