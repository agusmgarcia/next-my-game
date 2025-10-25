import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import { Entity } from "#src/entities";
import { type System } from "#src/systems";

import { type Event, type ReadonlySystemsList } from "./Scene.types";
import { SystemsList } from "./Scene.utils";

export default abstract class Scene extends Entity<Event> {
  private readonly _systems: SystemsList;

  private _disposeAnimationFrame: Func;

  constructor() {
    super(new Three.Scene());

    this._systems = new SystemsList();

    this._disposeAnimationFrame = emptyFunction;
  }

  get systems(): ReadonlySystemsList {
    return this._systems;
  }

  addSystem(system: System): void {
    const prevScene = system["_scene"];
    if (!!prevScene) prevScene.removeSystem(system);

    this._systems.add(system);
    system["attachScene"](this);

    this.notifyListeners({
      channel: `system:${system.id}`,
      payload: system,
      source: this,
      type: "SYSTEM_ADDED",
    });
  }

  removeSystem(system: System): void {
    this._systems.remove(system);
    system["detachScene"]();

    this.notifyListeners({
      channel: `system:${system.id}`,
      payload: system,
      source: this,
      type: "SYSTEM_REMOVED",
    });
  }

  private load(): Promise<void> {
    return this.onLoad();
  }

  protected onLoad(): Promise<void> {
    return Promise.resolve();
  }

  private init(...canvas: HTMLCanvasElement[]): void {
    this.onInit(...canvas);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onInit(...canvas: HTMLCanvasElement[]): void {}

  private run(fps: number): void {
    const msPerFrame = 1000 / fps;

    let previous = performance.now();

    const animate = (current: number) => {
      handler = requestAnimationFrame(animate);

      const elapsed = current - previous;

      if (elapsed <= msPerFrame) return;
      previous = current;

      this.systems.forEach((system) => system["onUpdate"](elapsed));
    };

    this._disposeAnimationFrame = () => cancelAnimationFrame(handler);
    let handler = requestAnimationFrame(animate);
  }

  override dispose(): void {
    this._disposeAnimationFrame();

    const systems = [...this.systems];
    systems.forEach((system) => this.removeSystem(system));
    systems.forEach((system) => system.dispose());

    super.dispose();
  }
}
