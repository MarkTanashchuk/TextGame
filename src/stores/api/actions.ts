import { nanoid } from "nanoid";

import { UniqueAction } from "../../types";
import { UniqueEventResult } from "../../types/event_result";
import { world } from "../world";

interface ActionsAPI {
  addAction(action: UniqueAction | UniqueEventResult<"ADD_ACTION">): void;
  resetActions(): void;
  activateAction(id: string): void;
}

export const actionsAPI: ActionsAPI = {
  addAction(action) {
    const listContainAction = world.state.actions.find(
      ({ id }) => id === action.id
    );

    if (!listContainAction) {
      const newAction = "payload" in action ? action.payload.action : action;

      world.state.actions.push({ ...newAction, id: action.id });
    }
  },

  resetActions() {
    world.state.actions.splice(0);
  },

  activateAction(id: string) {
    const activatedActionIndex = world.state.actions.findIndex(
      (action) => action.id === id
    );

    if (activatedActionIndex != -1) {
      world.state.actions[activatedActionIndex].result.forEach((event) => {
        world.api.processEvent({
          id: nanoid(),
          ...event,
        });
      });
      world.state.actions.splice(activatedActionIndex, 1);
    }
  },
};
