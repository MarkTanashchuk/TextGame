export interface MessageProps {
  id: string;
  text: string;
  type: "text" | "event" | "ending" | "description";
}
