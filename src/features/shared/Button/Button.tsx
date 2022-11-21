import styles from "./index.module.scss";

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
