import { type Func } from "@agusmgarcia/react-essentials-utils";
import * as Three from "three";

export class Renderer {
  private readonly _raw: Three.WebGLRenderer;
  private readonly _disposeResizeEvent: Func;

  constructor(canvas: HTMLCanvasElement) {
    this._raw = new Three.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    });

    const observer = new ResizeObserver((entries) =>
      this._raw.setSize(
        entries[0].contentRect.width,
        entries[0].contentRect.height,
        false,
      ),
    );

    observer.observe(canvas);

    this._disposeResizeEvent = () => {
      observer.unobserve(canvas);
      observer.disconnect();
    };

    // TODO: react to device pixel ratio changes
    this._raw.setPixelRatio(window.devicePixelRatio);
  }

  get canvas(): HTMLCanvasElement {
    return this._raw.domElement;
  }

  render(scene: Three.Object3D, camera: Three.Camera): void {
    this._raw.render(scene, camera);
  }

  dispose(): void {
    this._disposeResizeEvent();
    this._raw.dispose();
  }
}
