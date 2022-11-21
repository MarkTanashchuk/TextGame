import { useEffect, useRef } from "react";

import { MessageProps } from "../../../types";
import { Button } from "../../shared";

import styles from "./index.module.scss";

export interface ChatProps {
  restartGame(): void;
  readonly messages: Readonly<MessageProps[]>;
}

export default function Chat({ restartGame, messages }: ChatProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: 999_999_999,
      behavior: "smooth",
    });
  }, [messages.length]);

  return (
    <div ref={chatRef} className={styles.messages}>
      {messages.map(({ type, text, id }) => (
        <div key={id} className={`${styles.message} ${styles[type]}`}>
          {text}
          {type === "ending" ? (
            <Button onClick={restartGame}>Restart Game</Button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
