import { Button, Title } from "../../shared";

import styles from "./index.module.scss";

export interface MenuProps {
  changeLocation(): void;
}

export default function Menu({ changeLocation }: MenuProps) {
  return (
    <div className={styles.menu}>
      <Title title="Кулю в лоб чи в Гааґу гоп" isCentered />
      <Button onClick={changeLocation}>Start Game</Button>
    </div>
  );
}
