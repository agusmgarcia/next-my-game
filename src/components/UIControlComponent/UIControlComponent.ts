import { type Func } from "@agusmgarcia/react-essentials-utils";

import { Component } from "../Component";
import { type Options } from "./UIControlComponent.types";

export default class UIControlComponent extends Component {
  private readonly _title: string;

  constructor(options: Options) {
    super({ single: true });
    this._title = options.title;
  }

  private get UI(): HTMLElement {
    const ui = document.getElementById(this.id);
    if (!ui)
      throw new Error(
        `Component '${this.constructor.name}' is not attached into any entity`,
      );

    return ui;
  }

  protected override onEntityAttached(): void {
    const ui = document.createElement("div");
    ui.id = this.id;
    ui.style.backgroundColor = "oklch(27.9% 0.041 260.031)";
    ui.style.borderRadius = "0.5rem";
    ui.style.display = "none";
    ui.style.flexDirection = "column";
    ui.style.gap = "calc(0.25rem * 4)";
    ui.style.left = "calc(0.25rem * 2)";
    ui.style.position = "absolute";
    ui.style.top = "calc(0.25rem * 2)";
    ui.style.width = "250px";
    ui.style.padding = "calc(0.25rem * 2)";
    ui.style.zIndex = "1";
    document.body.prepend(ui);

    const title = document.createElement("h1");
    title.textContent = this._title;
    title.style.color = "white";
    title.style.textDecoration = "underline";
    ui.append(title);
  }

  protected override onEntityDetached(): void {
    const ui = document.getElementById(this.id);
    if (!ui) return;

    document.body.removeChild(ui);
  }

  addInput(
    name: string,
    value: string,
    callback: Func<void, [value: string]>,
  ): void {
    const input = document.createElement("input");
    input.name = name;
    input.placeholder = name;
    input.value = value;
    input.style.backgroundColor = "white";
    input.style.borderRadius = "0.5rem";
    input.style.padding = "calc(0.25rem * 2)";
    input.addEventListener("input", () => callback(input.value));

    this.UI.append(input);
    this.UI.style.display = "flex";
  }

  removeInput(name: string): void {
    const input = this.UI.querySelector(`input[name='${name}']`);
    if (!input) return;

    this.UI.removeChild(input);
    this.UI.style.display = this.UI.children.length > 1 ? "flex" : "none";
  }

  addButton(name: string, callback: Func): void {
    const button = document.createElement("button");
    button.name = name;
    button.textContent = name;
    button.style.backgroundColor = "white";
    button.style.borderRadius = "0.5rem";
    button.style.cursor = "pointer";
    button.style.padding = "calc(0.25rem * 2)";
    button.addEventListener("click", callback);

    this.UI.append(button);
    this.UI.style.display = "flex";
  }

  removeButton(name: string): void {
    const button = this.UI.querySelector(`button[name='${name}']`);
    if (!button) return;

    this.UI.removeChild(button);
    this.UI.style.display = this.UI.children.length > 1 ? "flex" : "none";
  }
}
