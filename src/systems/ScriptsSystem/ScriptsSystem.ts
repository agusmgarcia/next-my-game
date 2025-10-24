import { ScriptComponent } from "#src/components";

import { System } from "../System";

export default class ScriptsSystem extends System<ScriptComponent> {
  constructor() {
    super(ScriptComponent);
  }

  protected override onUpdate(deltaTime: number): void {
    this.components.forEach((script) => script["onUpdate"](deltaTime));
  }
}
