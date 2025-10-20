import { AmbientLight, Camera, Scene } from "#src/entities";
import { Brad } from "#src/models";

export default class TestScene extends Scene {
  constructor() {
    super();
  }

  override async load(): Promise<void> {
    await Promise.all([Brad.load()]);
  }

  override init(...canvas: HTMLCanvasElement[]): void {
    super.init(...canvas);
    this.addChild(new AmbientLight({ intensity: 0.01 }));

    const camera = new Camera({ canvas: canvas[0] });
    camera.setPosition(0, 0, 500);
    this.addChild(camera);

    const brad = new Brad();
    this.addChild(brad);
  }
}
