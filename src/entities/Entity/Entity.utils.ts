import { List } from "#src/utils";

import type Entity from "./Entity";
import { type ReadonlyChildrenList } from "./Entity.types";

export class ChildrenList
  extends List<Entity>
  implements ReadonlyChildrenList {}
