import { type Readonly } from "./List.types";

export default class List<TElement>
  extends Array<TElement>
  implements Readonly<TElement>
{
  add(elementToAdd: TElement): void {
    this.push(elementToAdd);
  }

  remove(elementToRemove: TElement): void {
    const indexOf = this.indexOf(elementToRemove);
    if (indexOf === -1) return;
    this.splice(indexOf, 1);
  }
}
