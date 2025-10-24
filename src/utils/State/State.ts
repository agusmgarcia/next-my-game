export default abstract class State<TInitArgs extends any[] = []> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onInit(...args: TInitArgs): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onUpdate(deltaTime: number): void {}

  protected onDispose(): void {}
}
