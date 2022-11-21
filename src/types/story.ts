import { Action, UniqueAction } from "./event_result";

export type NonUniqueRooms = { [Name in RoomName]: Room<Name> };
export type Story = { [Name in RoomName]: UniqueRoom<Name> };
export type RoomName = "Кабінет" | "Коридор" | "Бункер";
export interface Room<Name extends RoomName = RoomName> {
  name: Name;
  description: string;
  actions: Action[];
}

export type UniqueRoom<Name extends RoomName = RoomName> = {
  id: string;
  name: Name;
  description: string;
  actions: UniqueAction[];
};
