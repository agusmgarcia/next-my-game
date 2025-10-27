import { AmbientLight, Camera } from "#src/entities";
import { Brad } from "#src/models";

import { Scene } from "../Scene";

export default class TestScene extends Scene {
  constructor() {
    super({ fps: true });
  }

  protected override async onLoad(): Promise<void> {
    await Promise.all([Brad.load()]);
  }

  protected override onInit(...canvas: HTMLCanvasElement[]): void {
    this.addChild(new AmbientLight({ intensity: 0.01 }));

    const camera = new Camera({ canvas: canvas[0] });
    camera.setPosition(0, 0, 500);
    this.addChild(camera);

    const brad = new Brad();
    this.addChild(brad);
  }
}
