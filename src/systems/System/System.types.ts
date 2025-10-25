import { type Component } from "#src/components";

export type ClassOf<TComponent extends Component> = abstract new (
  ...args: any
) => TComponent;
