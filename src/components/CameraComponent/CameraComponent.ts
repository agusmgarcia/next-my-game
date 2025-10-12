import * as Three from "three";

import { type Entity } from "#src/entities";

import { Component } from "../Component";
import { type Event, type Options } from "./CameraComponent.types";

export default class CameraComponent extends Component<Event> {
  private readonly _raw: Three.PerspectiveCamera;
  private readonly _observer: ResizeObserver;

  private _canvas: HTMLCanvasElement;

  constructor(options: Options) {
    super({ single: true });

    this._raw = new Three.PerspectiveCamera(
      options.fov,
      options.canvas.clientWidth / options.canvas.clientHeight,
      options.near,
      options.far,
    );

    this._observer = new ResizeObserver((entries) => {
      this._raw.aspect =
        entries[0].contentRect.width / entries[0].contentRect.height;
      this._raw.updateProjectionMatrix();
    });

    this._observer.observe(options.canvas);

    this._canvas = options.canvas;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  setCanvas(canvas: HTMLCanvasElement): void {
    this._observer.unobserve(this._canvas);

    this._canvas = canvas;

    this._raw.aspect = canvas.clientWidth / canvas.clientHeight;
    this._raw.updateProjectionMatrix();

    this._observer.observe(this._canvas);

    this.notifyListeners({
      channel: "canvas",
      payload: undefined,
      source: this,
      type: "CANVAS_CHANGED",
    });
  }

  get far(): number {
    return this._raw.far;
  }

  setFar(far: number): void {
    this._raw.far = far;
    this._raw.updateProjectionMatrix();

    this.notifyListeners({
      channel: "far",
      payload: undefined,
      source: this,
      type: "FAR_CHANGED",
    });
  }

  get fov(): number {
    return this._raw.fov;
  }

  setFov(fov: number): void {
    this._raw.fov = fov;
    this._raw.updateProjectionMatrix();

    this.notifyListeners({
      channel: "fov",
      payload: undefined,
      source: this,
      type: "FOV_CHANGED",
    });
  }

  get near(): number {
    return this._raw.near;
  }

  setNear(near: number): void {
    this._raw.near = near;
    this._raw.updateProjectionMatrix();

    this.notifyListeners({
      channel: "near",
      payload: undefined,
      source: this,
      type: "NEAR_CHANGED",
    });
  }

  protected override onEntityAttached(entity: Entity): void {
    entity["_raw"].add(this._raw);
  }

  protected override onEntityDetached(entity: Entity): void {
    entity["_raw"].remove(this._raw);
  }

  override dispose(): void {
    this._observer.disconnect();
    super.dispose();
  }
}
