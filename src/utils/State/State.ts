export default abstract class State<TInitArgs extends any[] = []> {
  constructor() {}

  protected abstract dispose(): void;

  protected abstract init(...args: TInitArgs): void;

  protected abstract update(deltaTime: number): void;
}
