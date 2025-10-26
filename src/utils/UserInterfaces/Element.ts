import { List, type ListTypes } from "#src/utils";

export default abstract class Element<
  TTag extends "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
> {
  private readonly _raw: HTMLElementTagNameMap[TTag];
  private readonly _children: List<Element<any>>;
  private readonly _pixelRegexp: RegExp;

  protected constructor(tag: TTag) {
    this._raw = document.createElement(tag);
    this._raw.style.position = "absolute";
    this._pixelRegexp = /px$/;

    this._children = new List();

    this.setX(0);
    this.setY(0);
  }

  get children(): ListTypes.Readonly<Element<any>> {
    return this._children;
  }

  addChild(element: Element<any>): void {
    this._children.add(element);
    this._raw.appendChild(element._raw);
  }

  removeChild(element: Element<any>): void {
    this._children.remove(element);
    this._raw.removeChild(element._raw);
  }

  get backgroundColor(): string | undefined {
    return this._raw.style.backgroundColor || undefined;
  }

  setBackgroundColor(backgroundColor: string): void {
    this._raw.style.backgroundColor = backgroundColor;
  }

  get borderRadius(): number {
    return +this._raw.style.backgroundColor.replace(this._pixelRegexp, "") || 0;
  }

  setBorderRadius(borderRadius: number): void {
    this._raw.style.borderRadius = `${borderRadius}px`;
  }

  get height(): number {
    return +this._raw.style.height.replace(this._pixelRegexp, "") || 0;
  }

  setHeight(height: number): void {
    this._raw.style.height = `${height}px`;
    this._raw.style.top = `calc(${(-this.y + 0.5) * 100}% - ${this.height / 2}px)`;
  }

  get padding(): number {
    return +this._raw.style.padding.replace(this._pixelRegexp, "") || 0;
  }

  setPadding(padding: number): void {
    this._raw.style.padding = `${padding}px`;
  }

  get width(): number {
    return +this._raw.style.width.replace(this._pixelRegexp, "") || 0;
  }

  setWidth(width: number): void {
    this._raw.style.width = `${width}px`;
    this._raw.style.left = `calc(${(this.x + 0.5) * 100}% - ${this.width / 2}px)`;
  }

  get x(): number {
    return +(this._raw.dataset.x || "0");
  }

  setX(x: number): void {
    this._raw.dataset.x = `${x}`;
    this._raw.style.left = `calc(${(this.x + 0.5) * 100}% - ${this.width / 2}px)`;
  }

  get y(): number {
    return +(this._raw.dataset.y || "0");
  }

  setY(y: number): void {
    this._raw.dataset.y = `${y}`;
    this._raw.style.top = `calc(${(-this.y + 0.5) * 100}% - ${this.height / 2}px)`;
  }
}
