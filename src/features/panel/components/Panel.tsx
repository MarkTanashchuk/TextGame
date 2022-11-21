import { Action } from "../../../types";
import Title, { TitleProps } from "../../shared/Title/Title";

import ActionList, { ActionListProps } from "./action-list/ActionList";
import styles from "./index.module.scss";
import CharacterInventory, { InventoryProps } from "./inventory/Inventory";

export interface PanelProps {
  title: TitleProps["title"];
  points: number;
  characterInfo: {
    items: Readonly<InventoryProps["items"]>;
    health: number;
  };
  actions: Readonly<ActionListProps["actions"]>;
  activateAction: ActionListProps["activateAction"];
}

export default function Panel({
  actions,
  characterInfo: { items, health },
  points,
  title,
  activateAction,
}: PanelProps) {
  const actionThatRelocate = (action: Action): boolean => {
    return action.result.some(
      (eventResult) =>
        eventResult.type === "CHANGE_LOCATION" || eventResult.type === "ENDING"
    );
  };
  const localActions = actions.filter((action) => !actionThatRelocate(action));
  const relocationActions = actions.filter(actionThatRelocate);

  return (
    <div className={styles.panel}>
      <Title title={title} />

      <div>Points: {points}</div>
      <div>Health: {health}</div>

      <CharacterInventory items={items} />

      {localActions.length > 0 ? (
        <ActionList actions={localActions} activateAction={activateAction} />
      ) : null}
      {relocationActions.length > 0 ? (
        <ActionList
          actions={relocationActions}
          activateAction={activateAction}
        />
      ) : null}
    </div>
  );
}
