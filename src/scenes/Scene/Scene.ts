import { emptyFunction, type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

import { Entity } from "#src/entities";

export default abstract class Scene extends Entity {
  private _disposeAnimationFrame: Func;

  constructor() {
    super(new Three.Scene());

    this._disposeAnimationFrame = emptyFunction;
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
    };

    this._disposeAnimationFrame = () => cancelAnimationFrame(handler);
    let handler = requestAnimationFrame(animate);
  }

  override dispose(): void {
    this._disposeAnimationFrame();
    super.dispose();
  }
}
