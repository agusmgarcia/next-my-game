import * as Three from "three";

import { type Component } from "#src/components";
import { Observable, type ObservableTypes } from "#src/utils";

import {
  type Event,
  type ReadonlyChildrenList,
  type ReadonlyComponentsList,
} from "./Entity.types";
import { ChildrenList, ComponentsList } from "./Entity.utils";

export default class Entity<
  TEvent extends ObservableTypes.Event = any,
> extends Observable<TEvent | Event> {
  private static readonly MAP = new Map<Three.Object3D, Entity>();

  private readonly _raw: Three.Object3D;
  private readonly _children: ChildrenList;
  private readonly _components: ComponentsList;

  constructor();

  // @ts-expect-error This constructor is just for internal usage.
  protected constructor(raw: Three.Object3D);

  constructor(raw?: Three.Object3D) {
    super();

    this._raw = raw || new Three.Object3D();
    this._children = new ChildrenList();
    this._components = new ComponentsList();

    Entity.MAP.set(this._raw, this);
  }

  get id(): string {
    return this._raw.uuid;
  }

  get parent(): Entity | undefined {
    return !!this._raw.parent ? Entity.MAP.get(this._raw.parent) : undefined;
  }

  get root(): Entity {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let aux: Entity = this;
    while (!!aux.parent) aux = aux.parent;
    return aux;
  }

  get children(): ReadonlyChildrenList {
    return this._children;
  }

  addChild(child: Entity): void {
    const prevParent = child.parent;
    if (!!prevParent) prevParent.removeChild(child);

    this._raw.add(child._raw);
    this._children.add(child);

    this.notifyListeners<Event>({
      channel: `child:${child.id}`,
      payload: child,
      source: this,
      type: "CHILD_ADDED",
    });
  }

  removeChild(child: Entity): void {
    this._raw.remove(child._raw);
    this._children.remove(child);

    this.notifyListeners<Event>({
      channel: `child:${child.id}`,
      payload: child,
      source: this,
      type: "CHILD_REMOVED",
    });
  }

  get components(): ReadonlyComponentsList {
    return this._components;
  }

  addComponent(component: Component): void {
    const prevEntity = component["_entity"];
    if (!!prevEntity) prevEntity.removeComponent(component);

    this._components.add(component);
    component["attachEntity"](this);

    this.notifyListeners<Event>({
      channel: `component:${component.id}`,
      payload: component,
      source: this,
      type: "COMPONENT_ADDED",
    });
  }

  removeComponent(component: Component): void {
    this._components.remove(component);
    component["detachEntity"]();

    this.notifyListeners<Event>({
      channel: `component:${component.id}`,
      payload: component,
      source: this,
      type: "COMPONENT_REMOVED",
    });
  }

  override dispose(): void {
    const children = [...this.children];
    children.forEach((child) => this.removeChild(child));
    children.forEach((child) => child.dispose());

    const components = [...this.components];
    components.forEach((component) => this.removeComponent(component));
    components.forEach((component) => component.dispose());

    super.dispose();
  }
}
