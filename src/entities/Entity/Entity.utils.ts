import { Component } from "#src/components";
import { List, TypedList } from "#src/utils";

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
    super(Component, ...parameters);
  }
}
