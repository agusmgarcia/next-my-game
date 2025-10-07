import * as Three from "three";

import { Observable } from "#src/utils";

import { type Event, type ReadonlyChildrenList } from "./Entity.types";
import { ChildrenList } from "./Entity.utils";

export default class Entity extends Observable<Event> {
  private static readonly MAP = new Map<Three.Object3D, Entity>();

  private readonly _raw: Three.Object3D;
  private readonly _children: ChildrenList;

  constructor(raw: Three.Object3D);

  constructor();

  constructor(raw?: Three.Object3D) {
    super();

    this._raw = raw || new Three.Object3D();
    this._children = new ChildrenList();
    Entity.MAP.set(this._raw, this);
  }

  get id(): string {
    return this._raw.uuid;
  }

  get children(): ReadonlyChildrenList {
    return this._children;
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

  addChild(child: Entity): void {
    const prevParent = child.parent;
    if (!!prevParent) prevParent.removeChild(child);

    this._raw.add(child._raw);
    this._children.add(child);

    this.notifyListeners({
      channel: `child:${child.id}`,
      payload: child,
      source: this,
      type: "CHILD_ADDED",
    });
  }

  removeChild(child: Entity): void {
    this._raw.remove(child._raw);
    this._children.remove(child);

    this.notifyListeners({
      channel: `child:${child.id}`,
      payload: child,
      source: this,
      type: "CHILD_REMOVED",
    });
  }

  override dispose(): void {
    const children = [...this.children];
    children.forEach((child) => this.removeChild(child));
    children.forEach((child) => child.dispose());

    super.dispose();
  }
}
