import { type System } from "#src/systems";
import { List } from "#src/utils";

import { type ReadonlySystemsList } from "./Scene.types";

export class SystemsList extends List<System> implements ReadonlySystemsList {}
