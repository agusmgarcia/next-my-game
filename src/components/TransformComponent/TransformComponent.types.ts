import type TransformComponent from "./TransformComponent";

export type Event =
  | {
      channel: "position";
      payload: undefined;
      source: TransformComponent;
      type: "POSITION_CHANGED";
    }
  | {
      channel: "rotation";
      payload: undefined;
      source: TransformComponent;
      type: "ROTATION_CHANGED";
    }
  | {
      channel: "scale";
      payload: undefined;
      source: TransformComponent;
      type: "SCALE_CHANGED";
    };
