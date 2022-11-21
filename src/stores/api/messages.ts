import { nanoid } from "nanoid";

import { EndingsList } from "../../assets/story";
import endings from "../../assets/story/endings";
import { MessageProps } from "../../types";
import { world } from "../world";

interface MessagesAPI {
  addMessage(
    id: string
  ): null | Record<MessageProps["type"], (text: string) => void>;
  addEnding(ending: EndingsList): void;
}

export const messagesAPI: MessagesAPI = {
  addMessage(id: string) {
    const messageExist =
      world.state.messages.find((message) => message.id === id) !== undefined;

    if (messageExist) {
      return null;
    }

    const pushItem = (text: string, type: MessageProps["type"]) => {
      world.state.messages.push({ type, text, id });
    };

    return {
      text: (text: string) => pushItem(text, "text"),
      event: (text: string) => pushItem(text, "event"),
      ending: (text: string) => pushItem(text, "ending"),
      description: (text: string) => pushItem(text, "description"),
    };
  },

  addEnding(ending: EndingsList) {
    messagesAPI.addMessage(nanoid())?.text(endings[ending]);
  },
};
