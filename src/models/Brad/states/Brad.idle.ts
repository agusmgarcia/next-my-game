import { State } from "#src/utils";

import type Brad from "../Brad";

export default class Idle extends State<[brad: Brad]> {
  private _brad: Brad = undefined!;

  protected override dispose(): void {}

  protected override init(brad: Brad): void {
    this._brad = brad;
    this._brad.setAnimation("Idle");
  }

  protected override update(): void {}
}
