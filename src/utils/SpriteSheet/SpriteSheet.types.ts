import { type Func } from "@agusmgarcia/react-essentials-utils";

export type Readonly<TAnimations extends string> = globalThis.Readonly<{
  animations: Record<
    TAnimations,
    globalThis.Readonly<{
      fps: number;
      sprites: ReadonlyArray<{ id: string; offsetX: number; offsetY: number }>;
    }>
  >;
  spriteSheet: Record<
    string,
    globalThis.Readonly<{ height: number; width: number; x: number; y: number }>
  >;
}>;

export type OnProgressCallback = Func<void, [progress: number]>;
