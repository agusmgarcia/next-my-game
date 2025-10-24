import { List } from "../List";
import { type Event, type Listener, type Readonly } from "./Observable.types";

export default class Observable<TEvent extends Event> implements Readonly {
  private readonly _listeners: List<Listener<TEvent>>;
  private readonly _channels: Record<string, number>;

  constructor() {
    this._listeners = new List();
    this._channels = {};
  }

  addListener(listener: Listener<TEvent>): void {
    this._listeners.add(listener);
  }

  removeListener(listener: Listener<TEvent>): void {
    this._listeners.remove(listener);
  }

  protected notifyListeners<TOtherEvent extends TEvent>(
    event: TOtherEvent,
  ): void {
    if (!this._channels[event.channel])
      this._channels[event.channel] = Number.MIN_SAFE_INTEGER;

    const index = ++this._channels[event.channel];

    this._listeners.forEach((listener) => {
      if (index !== this._channels[event.channel]) return;
      listener(event);
    });
  }

  dispose(): void {
    const listeners = [...this._listeners];
    listeners.forEach((listener) => this.removeListener(listener));
  }
}
