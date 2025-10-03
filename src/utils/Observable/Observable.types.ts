import { type Func } from "@agusmgarcia/react-essentials-utils";

export interface Readonly {}

export type Listener<TEvent extends Event> = Func<void, [event: TEvent]>;

export type Event = {
  channel: string;
  payload: any;
  source: any;
  type: string;
};
