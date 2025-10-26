import { type ListTypes, UserInterfaces } from "#src/utils";

import { Component } from "../Component";

export default class UserInterfaceComponent extends Component {
  private readonly _container: UserInterfaces.Container;

  constructor() {
    super();

    this._container = new UserInterfaces.Container();
    this._container["_raw"].style.position = "";

    const element = document.querySelector("div#__next > div");
    if (!element) throw new Error("Main element not found");

    element.append(this._container["_raw"]);
  }

  get children(): ListTypes.Readonly<UserInterfaces.Element<any>> {
    return this._container.children;
  }

  addChild(child: UserInterfaces.Element<any>): void {
    this._container.addChild(child);
  }

  removeChild(child: UserInterfaces.Element<any>): void {
    this._container.removeChild(child);
  }

  override dispose(): void {
    this._container["_raw"].remove();
    super.dispose();
  }
}
