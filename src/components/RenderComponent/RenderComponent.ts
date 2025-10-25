import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import { type Entity, type EntityTypes } from "#src/entities";
import { type Texture, type TextureTypes } from "#src/utils";

import {
  AnimationComponent,
  type AnimationComponentTypes,
} from "../AnimationComponent";
import { Component } from "../Component";
import { type Options } from "./RenderComponent.types";

export default class RenderComponent extends Component {
  private readonly _raw: Three.Mesh<
    Three.PlaneGeometry,
    Three.MeshStandardMaterial
  >;
  private readonly _map: TextureTypes.Readonly;
  private readonly _normalMap: TextureTypes.Readonly | undefined;

  private _removeEntityListener: Func;
  private _removeAnimationListener: Func;

  constructor(options: Options) {
    super({ single: true });

    this._raw = new Three.Mesh(
      new Three.PlaneGeometry(1, 1),
      new Three.MeshStandardMaterial({
        map: (options.map as Texture)["_raw"],
        normalMap: (options?.normalMap as Texture | undefined)?.["_raw"],
        side: Three.DoubleSide,
        transparent: true,
      }),
    );
    this._map = options.map;
    this._normalMap = options.normalMap;

    this._removeEntityListener = emptyFunction;
    this._removeAnimationListener = emptyFunction;
  }

  get map(): TextureTypes.Readonly {
    return this._map;
  }

  get normalMap(): TextureTypes.Readonly | undefined {
    return this._normalMap;
  }

  protected override onEntityAttached(entity: Entity): void {
    entity["_raw"].add(this._raw);
    entity.components.forEach((component) => this.attachComponent(component));

    const listener = (event: EntityTypes.Event) => {
      switch (event.type) {
        case "COMPONENT_ADDED":
          this.attachComponent(event.payload);
          return;

        case "COMPONENT_REMOVED":
          this.detachComponent(event.payload);
          return;
      }
    };

    entity.addListener(listener);
    this._removeEntityListener = () => entity.removeListener(listener);
  }

  private attachComponent(component: Component): void {
    if (!(component instanceof AnimationComponent)) return;

    const setAttributes = (animation: AnimationComponent<string>) => {
      const uvAttribute = this._raw.geometry.attributes.uv;

      const { id, offsetX, offsetY } =
        animation.animations[animation.animation].sprites[animation.index];

      const { height, width, x, y } = animation.spriteSheet[id];

      const sheetWidth = this.map.width;
      const sheetHeight = this.map.height;

      const x0 = x / sheetWidth;
      const x1 = (x + width) / sheetWidth;
      const y0 = 1 - (y + height) / sheetHeight;
      const y1 = 1 - y / sheetHeight;

      uvAttribute.setXY(0, x0, y1);
      uvAttribute.setXY(1, x1, y1);
      uvAttribute.setXY(2, x0, y0);
      uvAttribute.setXY(3, x1, y0);
      uvAttribute.needsUpdate = true;

      this._raw.scale.set(width, height, 1);
      this._raw.position.set(-offsetX, -offsetY, 0);
    };

    setAttributes(component);
    this._removeAnimationListener();

    const listener = (event: AnimationComponentTypes.Event<string>) => {
      switch (event.type) {
        case "ANIMATION_CHANGED":
        case "INDEX_CHANGED":
          setAttributes(event.source);
          return;
      }
    };

    component.addListener(listener);
    this._removeAnimationListener = () => component.removeListener(listener);
  }

  protected override onEntityDetached(entity: Entity): void {
    entity["_raw"].remove(this._raw);
    entity.components.forEach((component) => this.detachComponent(component));
    this._removeEntityListener();
    this._removeEntityListener = emptyFunction;
  }

  private detachComponent(component: Component): void {
    if (!(component instanceof AnimationComponent)) return;

    this._removeAnimationListener();
    this._removeAnimationListener = emptyFunction;

    const uvAttribute = this._raw.geometry.attributes.uv;

    uvAttribute.setXY(0, 0, 1);
    uvAttribute.setXY(1, 1, 1);
    uvAttribute.setXY(2, 0, 0);
    uvAttribute.setXY(3, 1, 0);
    uvAttribute.needsUpdate = true;

    this._raw.scale.set(1, 1, 1);
    this._raw.position.set(0, 0, 0);
  }

  override dispose(): void {
    this._raw.geometry.dispose();
    this._raw.material.dispose();
    super.dispose();
  }
}
