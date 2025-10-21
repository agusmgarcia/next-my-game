import * as Three from "three";

import { type OnProgressCallback, type Readonly } from "./SpriteSheet.types";

export default class SpriteSheet {
  private static readonly LOADER = new Three.FileLoader();

  private constructor() {}

  static async load<TAnimations extends string>(
    url: string,
    callback?: OnProgressCallback,
  ): Promise<Readonly<TAnimations>> {
    return await SpriteSheet.LOADER.loadAsync(url, (event) =>
      callback?.(Math.floor((event.loaded / event.total) * 100)),
    ).then((result) => JSON.parse(result as string));
  }
}
