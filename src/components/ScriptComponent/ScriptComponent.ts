import { type ObservableTypes } from "#src/utils";

import { Component } from "../Component";
import { type Options } from "./ScriptComponent.types";

export default abstract class ScriptComponent<
  TEvent extends ObservableTypes.Event = any,
> extends Component<TEvent> {
  protected constructor(options?: Partial<Options>) {
    super(options);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onUpdate(deltaTime: number): void {}
}
