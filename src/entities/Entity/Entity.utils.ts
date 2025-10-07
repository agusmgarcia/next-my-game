import { finds } from "@agusmgarcia/react-essentials-utils";

import { Component } from "#src/components";
import { List, TypedList, type TypedListTypes } from "#src/utils";

import type Entity from "./Entity";
import {
  type ReadonlyChildrenList,
  type ReadonlyComponentsList,
} from "./Entity.types";

export class ChildrenList
  extends List<Entity>
  implements ReadonlyChildrenList {}

export class ComponentsList
  extends TypedList<Component>
  implements ReadonlyComponentsList
{
  constructor(arrayLength: number);

  constructor(...components: Component[]);

  constructor(...parameters: any[]) {
    // @ts-expect-error Not sure how to fix it
    super(Component, ...parameters);
  }

  getSingle<TComponentChild extends Component>(
    classOf: TypedListTypes.ClassOf<TComponentChild>,
  ): TComponentChild {
    const component = this.getSingleOrDefault(classOf);
    if (!component)
      throw new Error(`Component '${classOf.name}' appears more than once`);

    return component;
  }

  getSingleOrDefault<TComponentChild extends Component>(
    classOf: TypedListTypes.ClassOf<TComponentChild>,
  ): TComponentChild | undefined {
    return this.getAll(classOf).find(finds.singleOrDefault);
  }
}
