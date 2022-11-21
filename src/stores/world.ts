import localforage from "localforage";
import proxyWithPersist, { PersistStrategy } from "valtio-persist";

import { createStory } from "../assets/story";
import { Item, MessageProps } from "../types";
import { UniqueAction } from "../types/event_result";
import { RoomName, Story } from "../types/story";

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

export const world = proxyWithPersist<WorldState>({
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
});
