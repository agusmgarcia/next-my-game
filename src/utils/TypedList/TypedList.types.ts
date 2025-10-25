import { type ListTypes } from "../List";

export interface Readonly<TElement extends object>
  extends ListTypes.Readonly<TElement> {
  getAll<TChild extends TElement>(
    classOf: ClassOf<TChild>,
  ): ListTypes.Readonly<TChild>;

  getSingle<TChild extends TElement>(classOf: ClassOf<TChild>): TChild;

  getSingleOrDefault<TChild extends TElement>(
    classOf: ClassOf<TChild>,
  ): TChild | undefined;
}

export type ClassOf<TElement extends object> = abstract new (
  ...args: any
) => TElement;
