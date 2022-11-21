import { nanoid } from "nanoid";

import { Room, RoomName } from "../../types";
import { Story, UniqueRoom } from "../../types/story";

import endings from "./endings";
import { locations } from "./story";

function makeRoomUnique<Name extends RoomName>(
  room: Room<Name>
): UniqueRoom<Name> {
  return {
    ...room,
    id: nanoid(),
    actions: room.actions.map((action) => ({ ...action, id: nanoid() })),
  };
}

export type EndingsList = keyof typeof endings;

export const createStory: () => Story = () => ({
  Кабінет: makeRoomUnique(locations.Кабінет),
  Коридор: makeRoomUnique(locations.Коридор),
  Бункер: makeRoomUnique(locations.Бункер),
});
