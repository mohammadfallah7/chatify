import {
  ActiveTabSwitch,
  BorderAnimatedContainer,
  ChatsList,
  ContactsList,
  ProfileHeader,
} from "./components";
import { useChatStore } from "./stores";

const App = () => {
  const activeTab = useChatStore((s) => s.activeTab);

  return (
    <BorderAnimatedContainer>
      <div className="flex w-full">
        <div className="w-xs md:w-sm bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "Chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>

        <div className="w-full bg-slate-900/50 backdrop-blur-sm"></div>
      </div>
    </BorderAnimatedContainer>
  );
};

export default App;
