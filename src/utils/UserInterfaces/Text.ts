import Element from "./Element";

export default class Text<
  TTag extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" = "p",
> extends Element<TTag> {
  constructor(tag: TTag) {
    super(tag);
    this["_raw"].style.display = "contents";
  }

  get color(): string | undefined {
    return this["_raw"].style.color || undefined;
  }

  setColor(color: string): void {
    this["_raw"].style.color = color;
  }

  get text(): string | undefined {
    return this["_raw"].textContent || undefined;
  }

  setText(text: string): void {
    this["_raw"].textContent = text;
  }
}
