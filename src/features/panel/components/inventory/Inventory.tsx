import { nanoid } from "nanoid";

import { Item } from "../../../../types";

import styles from "./index.module.scss";

export interface InventoryProps {
  items: Readonly<Item[]>;
}

export default function Inventory({ items }: InventoryProps) {
  return (
    <div className={styles.inventory}>
      {items.map(({ description, image }) => (
        <div key={nanoid()} className={styles.inventory__item__slot}>
          <img alt={description} src={`images/${image}`} />
        </div>
      ))}
      <div
        className={`${styles.inventory__item__slot} ${styles.placeholder}`}
      />
    </div>
  );
}
