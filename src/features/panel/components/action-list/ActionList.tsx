import type { UniqueAction } from "../../../../types";

import styles from "./index.module.scss";

export interface ActionListProps {
  readonly actions: Readonly<UniqueAction>[];
  activateAction(id: string): void;
}

export default function ActionList({
  actions,
  activateAction,
}: ActionListProps) {
  return (
    <ul className={styles.list}>
      {actions.map((action) => (
        <li key={action.id} className={styles.list__item}>
          <div className={styles.list__item__line} />
          <button
            className={styles.list__item__button}
            onClick={() => activateAction(action.id)}
          >
            {action.description}
          </button>
        </li>
      ))}
    </ul>
  );
}
