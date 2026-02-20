import {
  ActiveTabSwitch,
  BorderAnimatedContainer,
  ChatContainer,
  ChatsList,
  ContactsList,
  NoConversationPlaceholder,
  ProfileHeader,
} from "./components";
import { MessagesProvider } from "./providers";
import { useChatStore } from "./stores";

const App = () => {
  const { activeTab, targetUser } = useChatStore();

  return (
    <BorderAnimatedContainer>
      <div className="flex w-full">
        <div className="w-xs md:w-sm bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto px-4 my-4">
            {activeTab === "Chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>

        <div className="w-full bg-slate-900/50 backdrop-blur-sm">
          {targetUser ? (
            <MessagesProvider targetUserId={targetUser._id}>
              <ChatContainer />
            </MessagesProvider>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </BorderAnimatedContainer>
  );
};

export default App;
