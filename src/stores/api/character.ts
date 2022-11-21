import { Item } from "../../types";
import { MAX_HP, world } from "../world";

interface CharacterAPI {
  addItem(item: Item): void;
  hasItem(itemName: Item["name"]): boolean;
  removeItem(item: Item["name"]): boolean;

  restoreHealth(): void;
  takeDamage(damage: number): boolean;
}

export const characterAPI: CharacterAPI = {
  addItem(item: Item) {
    const itemExist =
      world.state.character.items.find(({ name }) => name === item.name) !==
      undefined;

    if (itemExist) {
      return;
    }

    world.state.character.items.push(item);
  },
  hasItem(name: Item["name"]): boolean {
    const item = world.state.character.items.find((item) => item.name === name);
    return item !== undefined;
  },

  removeItem(name: Item["name"]) {
    const itemIndex = world.state.character.items.findIndex(
      (item) => item.name === name
    );
    return world.state.character.items.splice(itemIndex, 1).length === 1;
  },
  restoreHealth() {
    world.state.character.health = MAX_HP;
  },
  takeDamage(damage: number) {
    world.state.character.health -= damage;
    const characterIsDead = 0 >= world.state.character.health;
    return characterIsDead;
  },
};
