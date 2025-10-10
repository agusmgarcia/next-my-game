import { List, type ListTypes } from "../List";
import { type ClassOf, type Readonly } from "./TypedList.types";

export default abstract class TypedList<TElement extends object>
  extends List<TElement>
  implements Readonly<TElement>
{
  private static readonly EMPTY_LIST: ListTypes.Readonly<any> = new List<any>();

  private readonly _basePrototype: any;
  private readonly _prototypes: Map<any, List<TElement>>;

  protected constructor(classOf: ClassOf<TElement>, arrayLength: number);

  protected constructor(classOf: ClassOf<TElement>, ...items: TElement[]);

  protected constructor(classOf: ClassOf<TElement>, ...rest: any[]) {
    super(...rest);

    this._basePrototype = classOf;
    this._prototypes = new Map();

    if (rest.length > 0 && typeof rest[0] !== "number") this.push(...rest);
  }

  getAll<TChild extends TElement>(
    classOf: ClassOf<TChild>,
  ): ListTypes.Readonly<TChild> {
    return this._prototypes.get(classOf) || TypedList.EMPTY_LIST;
  }

  /**
   * @deprecated This method hasn't been implemented yet.
   */
  override copyWithin(): this {
    throw new Error("Method not implemented");
  }

  override fill(elementToAdd: TElement, start?: number, end?: number): this {
    const elementsToRemove = super.slice(start, end);
    elementsToRemove.forEach((element) => this.removeRecursive(element));

    super.fill(elementToAdd, start, end);
    elementsToRemove.forEach(() => this.addRecursive(elementToAdd));

    return this;
  }

  override pop(): TElement | undefined {
    const elementToRemove = super.pop();
    if (!elementToRemove) return undefined;
    this.removeRecursive(elementToRemove);
    return elementToRemove;
  }

  override push(...elementsToAdd: TElement[]): number {
    const newLength = super.push(...elementsToAdd);
    elementsToAdd.forEach((element) => this.addRecursive(element));
    return newLength;
  }

  override shift(): TElement | undefined {
    const elementToRemove = super.shift();
    if (!elementToRemove) return undefined;
    this.removeRecursive(elementToRemove);
    return elementToRemove;
  }

  override splice(
    start: number,
    deleteCount?: number,
    ...elementsToAdd: TElement[]
  ): TElement[] {
    const elementsToRemove =
      arguments.length === 1
        ? super.splice(start)
        : typeof deleteCount === "undefined"
          ? super.splice(start, deleteCount)
          : super.splice(start, deleteCount, ...elementsToAdd);

    elementsToRemove.forEach((element) => this.removeRecursive(element));
    elementsToAdd.forEach((element) => this.addRecursive(element));

    return elementsToRemove;
  }

  override unshift(...elementsToAdd: TElement[]): number {
    const newLength = super.unshift(...elementsToAdd);
    elementsToAdd.forEach((element) => this.addRecursive(element));
    return newLength;
  }

  private addRecursive(elementToAdd: TElement): void {
    let auxPrototype = elementToAdd.constructor;

    while (auxPrototype !== this._basePrototype) {
      if (!this._prototypes.has(auxPrototype))
        this._prototypes.set(auxPrototype, new List<TElement>());

      const list = this._prototypes.get(auxPrototype);
      if (!list) break;

      list.add(elementToAdd);
      auxPrototype = Object.getPrototypeOf(auxPrototype);
    }
  }

  private removeRecursive(elementToRemove: TElement): void {
    let auxPrototype = elementToRemove.constructor;

    while (auxPrototype !== this._basePrototype) {
      const list = this._prototypes.get(auxPrototype);
      if (!list) break;

      list.remove(elementToRemove);
      auxPrototype = Object.getPrototypeOf(auxPrototype);
    }
  }
}
