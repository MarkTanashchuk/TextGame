import { EndingsList } from "../assets/story";

import { RoomName } from "./story";

import { Item } from ".";

interface EventResultSchema {
  requirements?: {
    item?: {
      exist: boolean;
      name: Item["name"];
    };
  };
  type: string;
  payload: Record<string, unknown>;
}

interface AddItem extends EventResultSchema {
  type: "ADD_ITEM";
  payload: { item: Item };
}

interface RemoveItem extends EventResultSchema {
  type: "REMOVE_ITEM";
  payload: { itemName: Item["name"] };
}

interface RestoreHealth extends EventResultSchema {
  type: "RESTORE_HEALTH";
  payload: { health: number };
}

interface TakeDamage extends EventResultSchema {
  type: "TAKE_DAMAGE";
  payload: { damage: number };
}

interface GetBonusPoint extends EventResultSchema {
  type: "GET_BONUS_POINT";
  payload: Record<string, never>;
}

interface ShowText extends EventResultSchema {
  type: "SHOW_TEXT";
  payload: { text: string };
}

interface ChangeLocation extends EventResultSchema {
  type: "CHANGE_LOCATION";
  payload: { newLocation: RoomName };
}

interface AddAction extends EventResultSchema {
  type: "ADD_ACTION";
  payload: {
    action: Action;
  };
}

interface EndStory extends EventResultSchema {
  type: "ENDING";
  payload: { ending: EndingsList };
}

type Payloads =
  | AddItem
  | RemoveItem
  | RestoreHealth
  | TakeDamage
  | GetBonusPoint
  | ShowText
  | ChangeLocation
  | AddAction
  | EndStory;

type Unique<T> = T & { id: string };

type Payload<T, N> = T extends { type: N } ? T : never;
export type EventResult<N = Payloads["type"]> = Payload<Payloads, N>;
export type UniqueEventResult<N = Payloads["type"]> = Unique<EventResult<N>>;

export interface Action {
  description: string;
  result: Readonly<EventResult[]>;
}

export type UniqueAction = Unique<Action>;
