import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import {
  CameraComponent,
  type Component,
  ScriptComponent,
  UIControlComponent,
} from "#src/components";
import { List } from "#src/utils";

import { Entity, type EntityTypes } from "../Entity";
import { Renderer } from "./Scene.utils";

export default abstract class Scene extends Entity {
  private readonly _entities: List<Entity>;
  private readonly _scripts: List<ScriptComponent>;
  private readonly _cameras: List<CameraComponent>;
  private readonly _renderers: Map<HTMLCanvasElement, Renderer>;
  private readonly _entityListener: Func<void, [event: EntityTypes.Event]>;

  private _disposeAnimationFrame: Func;

  constructor() {
    super(new Three.Scene());

    this._entities = new List();
    this._scripts = new List();
    this._cameras = new List();
    this._renderers = new Map();

    this._entityListener = (event: EntityTypes.Event) => {
      switch (event.type) {
        case "CHILD_ADDED":
          this.trackEntity(event.payload);
          return;

        case "CHILD_REMOVED":
          this.untrackEntity(event.payload);
          return;

        case "COMPONENT_ADDED":
          this.trackComponent(event.payload);
          return;

        case "COMPONENT_REMOVED":
          this.untrackComponent(event.payload);
          return;
      }
    };

    this._disposeAnimationFrame = emptyFunction;
  }

  override addChild(child: Entity): void {
    super.addChild(child);
    this.trackEntity(child);
  }

  private trackEntity(entity: Entity): void {
    this._entities.add(entity);
    entity.addListener(this._entityListener);

    for (const component of entity.components) this.trackComponent(component);
    for (const child of entity.children) this.trackEntity(child);
  }

  override addComponent(component: Component): void {
    super.addComponent(component);
    this.trackComponent(component);
  }

  private trackComponent(component: Component): void {
    if (component instanceof ScriptComponent) this._scripts.add(component);
    if (component instanceof CameraComponent) this._cameras.add(component);
  }

  override removeComponent(component: Component): void {
    this.untrackComponent(component);
    super.removeComponent(component);
  }

  private untrackComponent(component: Component): void {
    if (component instanceof ScriptComponent) this._scripts.remove(component);
    if (component instanceof CameraComponent) this._cameras.remove(component);
  }

  override removeChild(child: Entity): void {
    this.untrackEntity(child);
    super.removeChild(child);
  }

  private untrackEntity(entity: Entity): void {
    for (const child of entity.children) this.untrackEntity(child);
    for (const component of entity.components) this.untrackComponent(component);

    entity.removeListener(this._entityListener);
    this._entities.remove(entity);
  }

  abstract load(): Promise<void>;

  init(...canvas: HTMLCanvasElement[]): void {
    canvas.forEach((c) => this._renderers.set(c, new Renderer(c)));
    this.addComponent(new UIControlComponent({ title: "Scene" }));
  }

  run(fps: number): void {
    const msPerFrame = 1000 / fps;

    let previous = performance.now();

    const animate = (current: number) => {
      handler = requestAnimationFrame(animate);

      const elapsed = current - previous;

      if (elapsed <= msPerFrame) return;
      previous = current;

      this._scripts.forEach((script) => script["onUpdate"](elapsed));

      this._cameras.forEach((camera) =>
        this._renderers
          .get(camera.canvas)
          ?.render(this["_raw"], camera["_raw"]),
      );
    };

    this._disposeAnimationFrame = () => cancelAnimationFrame(handler);
    let handler = requestAnimationFrame(animate);
  }

  addUIControlInput(
    name: string,
    value: string,
    callback: Func<void, [value: string]>,
  ): void {
    this.components
      .getSingle(UIControlComponent)
      .addInput(name, value, callback);
  }

  removeUIControlInput(name: string): void {
    this.components.getSingle(UIControlComponent).removeInput(name);
  }

  addUIControlButton(name: string, callback: Func): void {
    this.components.getSingle(UIControlComponent).addButton(name, callback);
  }

  removeUIControlButton(name: string): void {
    this.components.getSingle(UIControlComponent).removeButton(name);
  }

  override dispose(): void {
    this._disposeAnimationFrame();
    this._renderers.forEach((renderer) => renderer.dispose());
    this._renderers.clear();
    super.dispose();
  }
}
