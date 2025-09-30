import { type Func } from "@agusmgarcia/react-essentials-utils";

export interface Readonly {
  get height(): number;
  get width(): number;
}

export type OnProgressCallback = Func<void, [progress: number]>;
