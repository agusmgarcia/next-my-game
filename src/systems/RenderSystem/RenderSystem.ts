import { type Func } from "@agusmgarcia/react-essentials-utils";

import { CameraComponent, type CameraComponentTypes } from "#src/components";

import { System } from "../System";
import { Renderer } from "./RenderSystem.utils";

export default class RenderSystem extends System<CameraComponent> {
  private readonly _renderers: Map<HTMLCanvasElement, Renderer>;
  private readonly _cameraListener: Func<
    void,
    [event: CameraComponentTypes.Event]
  >;

  constructor() {
    super(CameraComponent);

    this._renderers = new Map();
    this._cameraListener = (event) => {
      switch (event.type) {
        case "CANVAS_CHANGED":
          const prevCanvas = event.payload;
          this._renderers.get(prevCanvas)?.dispose();
          this._renderers.delete(prevCanvas);

          const newCanvas = event.source.canvas;
          if (this._renderers.has(newCanvas)) return;
          this._renderers.set(newCanvas, new Renderer(newCanvas));

          return;
      }
    };
  }

  protected override onComponentAttached(component: CameraComponent): void {
    component.addListener(this._cameraListener);
    if (this._renderers.has(component.canvas)) return;
    this._renderers.set(component.canvas, new Renderer(component.canvas));
  }

  protected override onUpdate(): void {
    this.components.forEach((camera) =>
      this._renderers
        .get(camera.canvas)
        ?.render(this.scene["_raw"], camera["_raw"]),
    );
  }

  protected override onComponentDetached(component: CameraComponent): void {
    component.removeListener(this._cameraListener);
    this._renderers.get(component.canvas)?.dispose();
    this._renderers.delete(component.canvas);
  }

  override dispose(): void {
    this._renderers.forEach((render) => render.dispose());
    this._renderers.clear();
    super.dispose();
  }
}
