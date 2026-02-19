import { formatDate } from "date-fns";
import { useAuthStore } from "../../stores";

export const ChatHistory = ({ data }) => {
  const user = useAuthStore((s) => s.user);

  return (
    <ul className="max-w-3xl mx-auto space-y-6">
      {data.map((message) => (
        <li
          key={message._id}
          className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
        >
          <div
            className={`chat-bubble ${message.senderId === user._id ? "chat-bubble-primary" : "chat-bubble-neutral"}`}
          >
            {message.image && (
              <img
                src={message.image}
                alt="Shared"
                className="rounded-lg h-48 object-cover"
              />
            )}
            {message.text && <p>{message.text}</p>}
            <small className="">
              {formatDate(new Date(message.createdAt), "p")}
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
};
