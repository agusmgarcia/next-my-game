import { CameraComponent } from "#src/components";

import { Object } from "../Object";
import { type Options } from "./Camera.types";

export default class Camera extends Object {
  constructor(options: Options) {
    super();
    this.addComponent(new CameraComponent(options));
  }

  get canvas(): HTMLCanvasElement {
    return this.components.getSingle(CameraComponent).canvas;
  }

  setCanvas(canvas: HTMLCanvasElement): void {
    this.components.getSingle(CameraComponent).setCanvas(canvas);
  }

  get far(): number {
    return this.components.getSingle(CameraComponent).far;
  }

  setFar(far: number): void {
    this.components.getSingle(CameraComponent).setFar(far);
  }

  get fov(): number {
    return this.components.getSingle(CameraComponent).fov;
  }

  setFov(fov: number): void {
    this.components.getSingle(CameraComponent).setFov(fov);
  }

  get near(): number {
    return this.components.getSingle(CameraComponent).near;
  }

  setNear(near: number): void {
    this.components.getSingle(CameraComponent).setNear(near);
  }
}
