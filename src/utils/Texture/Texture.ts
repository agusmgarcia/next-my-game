import * as Three from "three";

import { type OnProgressCallback, type Readonly } from "./Texture.types";

export default class Texture implements Readonly {
  private static readonly LOADER = new Three.TextureLoader();

  private readonly _raw: Three.Texture;

  private constructor(texture: Three.Texture) {
    this._raw = texture;
    texture.magFilter = Three.LinearFilter;
    texture.minFilter = Three.LinearMipmapLinearFilter;
    texture.colorSpace = Three.SRGBColorSpace;
  }

  get width(): number {
    return this._raw.width;
  }

  get height(): number {
    return this._raw.height;
  }

  dispose(): void {
    this._raw.dispose();
  }

  static async load(
    url: string,
    callback?: OnProgressCallback,
  ): Promise<Readonly> {
    return await Texture.LOADER.loadAsync(url, (event) =>
      callback?.(Math.floor((event.loaded / event.total) * 100)),
    ).then((t) => new Texture(t));
  }
}
