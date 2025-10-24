import { errors } from "@agusmgarcia/react-essentials-utils";

import { StateComponent } from "#src/components";
import {
  SpriteSheet,
  type SpriteSheetTypes,
  Texture,
  type TextureTypes,
} from "#src/utils";

import { Model } from "../Model";
import spriteSheet from "./Brad.json";
import normalMap from "./Brad.normal.png";
import map from "./Brad.png";
import { type Animations } from "./Brad.types";
import { Walk } from "./states";

export default class Brad extends Model<Animations> {
  private static MAP_TEXTURE: TextureTypes.Readonly | undefined;
  private static NORMAL_MAP_TEXTURE: TextureTypes.Readonly | undefined;
  private static SPRITE_SHEET:
    | SpriteSheetTypes.Readonly<Animations>
    | undefined;

  constructor() {
    super({
      animations: !!Brad.SPRITE_SHEET
        ? Brad.SPRITE_SHEET.animations
        : errors.emit("You need to call Brad.load() first"),
      initialAnimation: "Idle",
      map: !!Brad.MAP_TEXTURE
        ? Brad.MAP_TEXTURE
        : errors.emit("You need to call Brad.load() first"),
      normalMap: !!Brad.NORMAL_MAP_TEXTURE
        ? Brad.NORMAL_MAP_TEXTURE
        : errors.emit("You need to call Brad.load() first"),
      spriteSheet: !!Brad.SPRITE_SHEET
        ? Brad.SPRITE_SHEET.spriteSheet
        : errors.emit("You need to call Brad.load() first"),
    });

    this.addComponent(new StateComponent({ single: true }));
    this.components.getSingle(StateComponent).setState(Walk, this);
  }

  static async load(): Promise<void> {
    await Promise.all([
      Texture.load(map.src).then((t) => (Brad.MAP_TEXTURE = t)),
      Texture.load(normalMap.src).then((t) => (Brad.NORMAL_MAP_TEXTURE = t)),
      SpriteSheet.load(spriteSheet as unknown as string).then(
        (s) => (Brad.SPRITE_SHEET = s),
      ),
    ]);
  }
}
