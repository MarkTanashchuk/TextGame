import localforage from "localforage";
import proxyWithPersist, { PersistStrategy } from "valtio-persist";

import { createStory } from "../assets/story";
import { Item, MessageProps, UniqueAction, UniqueEventResult } from "../types";
import { RoomName, Story } from "../types/story";

import { actionsAPI } from "./api/actions";
import { characterAPI } from "./api/character";
import { locationAPI } from "./api/location";
import { messagesAPI } from "./api/messages";
import { pointsAPI } from "./api/points";

export type EventProcessor<State> = State;

export interface WorldState {
  story: Story;
  sessionId: null | string;
  points: number;
  currentLocation: RoomName | null;
  actions: UniqueAction[];
  messages: MessageProps[];
  character: {
    items: Item[];
    health: number;
  };
}

localforage.config({ driver: localforage.INDEXEDDB });

export const APP_VERSION = 1;
export const MAX_HP = 10;

export const world = {
  state: proxyWithPersist<WorldState>({
    name: "text-adventure",
    version: APP_VERSION,
    migrations: {},
    persistStrategies: PersistStrategy.SingleFile,
    initialState: {
      story: createStory(),
      sessionId: null,
      points: 0,
      currentLocation: null,
      /// Arrays instead of valtio's `proxyMap` because serializing `Map` is not supported by `valtio-persist`
      messages: [],
      actions: [],
      character: {
        items: [],
        health: MAX_HP,
      },
    },
    getStorage() {
      return {
        getItem(key) {
          return localforage.getItem(key);
        },
        setItem(key, value) {
          localforage.setItem(key, value);
        },
        removeItem(key) {
          localforage.removeItem(key);
        },
        getAllKeys() {
          return localforage.keys();
        },
      };
    },
  }),
  api: {
    ...pointsAPI,
    ...actionsAPI,
    ...characterAPI,
    ...messagesAPI,
    ...locationAPI,
    restartGame() {
      localforage.clear();
      window?.location.reload();
    },
    addCurrentRoomInformation(sessionId: string) {
      const { state } = world;

      if (state.currentLocation === null || state.sessionId !== sessionId) {
        state.sessionId = sessionId;
      } else {
        const { id, description, actions } = state.story[state.currentLocation];
        actions.forEach(this.addAction);
        this.addMessage(id)?.description(description);
      }
    },
    processEvent({ requirements, id, type, payload }: UniqueEventResult) {
      if (requirements) {
        if (requirements.item) {
          const itemExist = this.hasItem(requirements.item.name);

          if (itemExist != requirements.item.exist) {
            return;
          }
        }
      }

      switch (type) {
        case "GET_BONUS_POINT":
          this.addPoint();
          this.addMessage(id)?.event("Отримано додатковий бал");
          break;
        case "SHOW_TEXT":
          this.addMessage(id)?.text(payload.text);
          break;
        case "CHANGE_LOCATION":
          this.resetActions();
          this.changeLocation(payload.newLocation);
          break;
        case "ADD_ACTION":
          this.addAction({ id, type, payload });
          break;
        case "ENDING":
          this.resetActions();
          this.addEnding(payload.ending);
          this.addMessage(id)?.ending(`Кінцівка: ${payload.ending}`);
          break;
        case "ADD_ITEM":
          this.addItem(payload.item);
          this.addMessage(id)?.event(`Отримано ${payload.item.name}`);
          break;
        case "REMOVE_ITEM":
          this.removeItem(payload.itemName);
          this.addMessage(id)?.event(`Втрачено ${payload.itemName}`);
          break;
        case "RESTORE_HEALTH":
          this.restoreHealth();
          this.addMessage(id)?.event("Здоров'я відновлено");
          break;
        case "TAKE_DAMAGE":
          this.takeDamage(payload.damage);
          this.addMessage(id)?.event(`Втрачено ${payload.damage} здоров'я`);
      }
    },
  },
};
