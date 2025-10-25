import { type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import { type Component } from "#src/components";
import { type Entity, type EntityTypes } from "#src/entities";
import { type Scene } from "#src/scenes";
import { List, type ListTypes } from "#src/utils";

import { type ClassOf } from "./System.types";

export default abstract class System<TComponent extends Component = Component> {
  private readonly _id: string;
  private readonly _components: List<TComponent>;
  private readonly _classOf: ClassOf<TComponent>;
  private readonly _entityListener: Func<void, [event: EntityTypes.Event]>;

  private _scene: Scene | undefined;

  protected constructor(classOf: ClassOf<TComponent>) {
    this._id = Three.MathUtils.generateUUID();
    this._components = new List();
    this._classOf = classOf;
    this._entityListener = (event) => {
      switch (event.type) {
        case "CHILD_ADDED":
          this.attachEntity(event.payload);
          return;

        case "CHILD_REMOVED":
          this.detachEntity(event.payload);
          return;

        case "COMPONENT_ADDED":
          this.attachComponent(event.payload);
          return;

        case "COMPONENT_REMOVED":
          this.detachComponent(event.payload);
          return;
      }
    };

    this._scene = undefined;
  }

  get id(): string {
    return this._id;
  }

  protected get components(): ListTypes.Readonly<TComponent> {
    return this._components;
  }

  protected get scene(): Scene {
    if (!this._scene)
      throw new Error(
        `System '${this.constructor.name}' is not attached into any scene`,
      );

    return this._scene;
  }

  private attachScene(scene: Scene): void {
    this._scene = scene;
    this.attachEntity(scene);
    this.onSceneAttached(scene);
  }

  private attachEntity(entity: Entity): void {
    entity.components.forEach((component) => this.attachComponent(component));
    entity.children.forEach((child) => this.attachEntity(child));
    entity.addListener(this._entityListener);
  }

  private attachComponent(component: Component): void {
    if (!(component instanceof this._classOf)) return;
    this._components.add(component);
    this.onComponentAttached(component);
  }

  private detachScene(): void {
    const prevScene = this._scene;
    if (!prevScene) return;

    this._scene = undefined;
    this.detachEntity(prevScene);
    this.onSceneDetached(prevScene);
  }

  private detachEntity(entity: Entity): void {
    entity.components.forEach((component) => this.detachComponent(component));
    entity.children.forEach((child) => this.detachEntity(child));
    entity.removeListener(this._entityListener);
  }

  private detachComponent(component: Component): void {
    if (!(component instanceof this._classOf)) return;
    this._components.remove(component);
    this.onComponentDetached(component);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onSceneAttached(scene: Scene): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onComponentAttached(component: TComponent): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onUpdate(deltaTime: number): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onComponentDetached(component: TComponent): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onSceneDetached(scene: Scene): void {}

  dispose(): void {}
}
