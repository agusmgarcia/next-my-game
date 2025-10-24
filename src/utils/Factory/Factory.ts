import { List } from "../List";

export default class Factory<TElement extends object> {
  private readonly _pool: Map<any, List<TElement>>;

  constructor() {
    this._pool = new Map();
  }

  getOrCreate<TChild extends TElement = TElement>(
    elementFactory: new () => TChild,
  ): TChild {
    const list = this._pool.get(elementFactory);
    return (list?.pop() || new elementFactory()) as TChild;
  }

  set(element: TElement): void {
    if (!this._pool.has(element.constructor))
      this._pool.set(element.constructor, new List<TElement>());

    const list = this._pool.get(element.constructor);
    if (!list) throw new Error("Unexpected scenario");

    list.add(element);
  }
}
