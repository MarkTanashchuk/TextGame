import { world } from "../world";

interface PointsAPI {
  addPoint(): void;
  removePoint(): void;
}

export const pointsAPI: PointsAPI = {
  addPoint() {
    world.state.points += 1;
  },

  removePoint() {
    world.state.points = Math.max(0, world.state.points - 1);
  },
};
