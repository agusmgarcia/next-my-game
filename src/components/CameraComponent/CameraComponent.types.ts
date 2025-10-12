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
      payload: undefined;
      source: CameraComponent;
      type: "CANVAS_CHANGED";
    }
  | {
      channel: "far";
      payload: undefined;
      source: CameraComponent;
      type: "FAR_CHANGED";
    }
  | {
      channel: "fov";
      payload: undefined;
      source: CameraComponent;
      type: "FOV_CHANGED";
    }
  | {
      channel: "near";
      payload: undefined;
      source: CameraComponent;
      type: "NEAR_CHANGED";
    };
