import { formatDate } from "date-fns";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../stores";

export const ChatHistory = ({ data }) => {
  const user = useAuthStore((s) => s.user);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <>
      <ul className="max-w-3xl mx-auto space-y-6">
        {data.map((message) => (
          <li
            key={message._id}
            className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble max-w-md ${message.senderId === user._id ? "chat-bubble-primary" : "chat-bubble-neutral"}`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Shared"
                  className="rounded-lg h-48 object-cover"
                />
              )}
              {message.text && (
                <p className={`${message.image && "mt-2"}`}>{message.text}</p>
              )}
              <small className="">
                {formatDate(new Date(message.createdAt), "p")}
              </small>
            </div>
          </li>
        ))}
      </ul>
      <div ref={messageEndRef} />
    </>
  );
};
