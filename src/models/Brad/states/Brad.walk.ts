import { State, Vector3 } from "#src/utils";

import type Brad from "../Brad";

export default class Walk extends State<[brad: Brad]> {
  private static readonly SPEED = 30 * 0.001;

  private _brad: Brad = undefined!;

  protected override onInit(brad: Brad): void {
    this._brad = brad;
    this._brad.setAnimation("Walk");
  }

  protected override onUpdate(deltaTime: number): void {
    this._brad.setPosition(
      Vector3.add(
        this._brad.position,
        Vector3.multiply(this._brad.right, Walk.SPEED * deltaTime),
      ),
    );
  }

  protected override onDispose(): void {}
}
