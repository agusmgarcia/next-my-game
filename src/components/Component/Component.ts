import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import { type Entity, type EntityTypes } from "#src/entities";
import { Observable, type ObservableTypes } from "#src/utils";

import { type Options } from "./Component.types";

export default abstract class Component<
  TEvent extends ObservableTypes.Event = any,
> extends Observable<TEvent> {
  private readonly _id: string;
  private readonly _single: boolean;

  private _entity: Entity | undefined;
  private _removeEntityListeners: Func;

  protected constructor(options?: Partial<Options>) {
    super();

    this._id = Three.MathUtils.generateUUID();
    this._single = !!options?.single;

    this._entity = undefined;
    this._removeEntityListeners = emptyFunction;
  }

  get id(): string {
    return this._id;
  }

  protected get entity(): Entity {
    if (!this._entity)
      throw new Error(
        `Component '${this.constructor.name}' is not attached into any entity`,
      );

    return this._entity;
  }

  private attachEntity(entity: Entity): void {
    if (this._single) {
      const components = entity.components.getAll(this.constructor as any);
      if (!!components.filter((c) => c !== this).length)
        throw new Error(
          `There is more than one component of type '${this.constructor.name}'`,
        );
    }

    this._entity = entity;

    const listener = (event: EntityTypes.Event) => {
      switch (event.type) {
        case "COMPONENT_ADDED":
          this.onComponentAdded(event.payload);
          return;

        case "COMPONENT_REMOVED":
          this.onComponentRemoved(event.payload);
          return;
      }
    };

    entity.addListener(listener);
    this._removeEntityListeners = () => entity.removeListener(listener);

    this.onEntityAttached(entity);
  }

  private detachEntity(): void {
    const prevEntity = this._entity;
    if (!prevEntity) return;

    this._entity = undefined;
    this._removeEntityListeners();

    this.onEntityDetached(prevEntity);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onEntityAttached(entity: Entity): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onComponentAdded(component: Component): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onComponentRemoved(component: Component): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onEntityDetached(entity: Entity): void {}
}
