import { useMessages } from "../../hooks";
import { useChatStore } from "../../stores";
import { ChatHeader } from "./ChatHeader";
import { ChatHistory } from "./ChatHistory";
import { MessagesSkeletonLoading } from "./MessagesSkeletonLoading";
import { NoChatHistoryPlaceholder } from "./NoChatHistoryPlaceholder";
import { SendMessageForm } from "./SendMessageForm";

export const ChatContainer = () => {
  const targetUser = useChatStore((s) => s.targetUser);

  const { data, loading } = useMessages();

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="px-6 flex-1 overflow-y-auto py-8">
        {loading ? (
          <MessagesSkeletonLoading />
        ) : data.length === 0 ? (
          <NoChatHistoryPlaceholder />
        ) : (
          <ChatHistory data={data} />
        )}
      </div>
      <SendMessageForm targetUserId={targetUser._id} />
    </div>
  );
};
