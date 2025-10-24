import { Factory, type State } from "#src/utils";

import { ScriptComponent } from "../ScriptComponent";
import { type Options } from "./StateComponent.types";

export default class StateComponent extends ScriptComponent {
  private static readonly STATE_FACTORY = new Factory<State<any[]>>();

  private _state: State<any[]> | undefined;
  private _newState: State<any[]> | undefined;
  private _newStateArgs: any[] | undefined;

  constructor(options?: Partial<Options>) {
    super(options);

    this._state = undefined;
  }

  get state(): State<any[]> | undefined {
    return this._state;
  }

  setState<TState extends State<any[]>>(
    stateClass: new () => TState,
    ...args: TState extends State<infer TInitArgs> ? TInitArgs : []
  ): void {
    if (!!this._newState && !!this._newStateArgs) {
      StateComponent.STATE_FACTORY.set(this._newState);
      this._newState = undefined;
      this._newStateArgs = undefined;
    }

    this._newState = StateComponent.STATE_FACTORY.getOrCreate(stateClass);
    this._newStateArgs = args;
  }

  protected override onUpdate(deltaTime: number): void {
    if (!!this._newState && !!this._newStateArgs) {
      if (!!this._state) {
        this._state["onDispose"]();
        StateComponent.STATE_FACTORY.set(this._state);
        this._state = undefined;
      }

      this._state = this._newState;
      this._newState = undefined;

      this._state["onInit"](...this._newStateArgs);
      this._newStateArgs = undefined;
    }

    this.state?.["onUpdate"](deltaTime);
  }
}
