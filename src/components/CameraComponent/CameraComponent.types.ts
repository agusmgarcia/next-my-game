import type CameraComponent from "./CameraComponent";

export type Options = {
  canvas: HTMLCanvasElement;
  far?: number;
  fov?: number;
  near?: number;
};

export type Event =
  | {
      channel: "canvas";
      payload: HTMLCanvasElement;
      source: CameraComponent;
      type: "CANVAS_CHANGED";
    }
  | {
      channel: "far";
      payload: number;
      source: CameraComponent;
      type: "FAR_CHANGED";
    }
  | {
      channel: "fov";
      payload: number;
      source: CameraComponent;
      type: "FOV_CHANGED";
    }
  | {
      channel: "near";
      payload: number;
      source: CameraComponent;
      type: "NEAR_CHANGED";
    };
