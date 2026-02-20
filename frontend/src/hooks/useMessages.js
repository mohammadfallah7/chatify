import { useContext } from "react";
import { MessagesContext } from "../contexts";

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      "You should use useMessages hook inside MessagesProvider component",
    );
  }

  return context;
};
