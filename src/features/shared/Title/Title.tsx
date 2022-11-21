import styles from "./index.module.scss";

export interface TitleProps {
  title: string;
  isCentered?: boolean;
}

export default function Title({ title, isCentered }: TitleProps) {
  return (
    <h2 className={`${styles.title} ${isCentered ? styles.centered : ""}`}>
      {title}
    </h2>
  );
}
