import { RoomName } from "../../types";
import { world } from "../world";

interface LocationAPI {
  changeLocation(newLocation: RoomName): void;
}

export const locationAPI: LocationAPI = {
  changeLocation(newLocation: RoomName) {
    world.state.currentLocation = newLocation;
  },
};
