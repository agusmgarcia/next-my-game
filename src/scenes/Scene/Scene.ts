import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import { UserInterfaceComponent } from "#src/components";
import { Entity } from "#src/entities";
import { RenderSystem, ScriptsSystem, type System } from "#src/systems";
import { UserInterfaces } from "#src/utils";

import {
  type Event,
  type Options,
  type ReadonlySystemsList,
} from "./Scene.types";
import { SystemsList } from "./Scene.utils";

export default abstract class Scene extends Entity<Event> {
  private readonly _systems: SystemsList;
  private readonly _fps: UserInterfaces.Text;
  private readonly _displayFPS: boolean;

  private _disposeAnimationFrame: Func;

  constructor(options?: Partial<Options>) {
    super(new Three.Scene());

    this._systems = new SystemsList();
    this._fps = new UserInterfaces.Text("p");
    this._fps.setColor("white");
    this._fps.setText("0");
    this._displayFPS = !!options?.fps;

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
    this.addSystem(new ScriptsSystem());
    this.addSystem(new RenderSystem());

    if (this._displayFPS) {
      const container = new UserInterfaces.Container();
      container.setBackgroundColor("rgb(103,78,149)");
      container.setBorderRadius(4);
      container.setWidth(30);
      container.setHeight(32);
      container.setX(-0.466);
      container.setY(0.466);
      container.setPadding(4);
      container.addChild(this._fps);

      this.addComponent(new UserInterfaceComponent());
      this.components.getSingle(UserInterfaceComponent).addChild(container);
    }

    this.onInit(...canvas);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onInit(...canvas: HTMLCanvasElement[]): void {}

  private run(fps: number): void {
    const msPerFrame = 1000 / fps;

    let previous = performance.now();
    let framesPerSecond = 0;

    const animate = (current: number) => {
      handler = requestAnimationFrame(animate);

      const elapsed = current - previous;

      if (elapsed <= msPerFrame) return;
      previous = current;

      this.systems.forEach((system) => system["onUpdate"](elapsed));
      framesPerSecond++;
    };

    const fpsIntervalHandler = setInterval(() => {
      this._fps.setText(`${framesPerSecond + 1}`);
      framesPerSecond = 0;
    }, 1000);

    this._disposeAnimationFrame = () => {
      cancelAnimationFrame(handler);
      clearInterval(fpsIntervalHandler);
    };

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
