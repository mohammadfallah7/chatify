import { useChatStore } from "../../stores";

export const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div role="tablist" className="tabs tabs-box bg-transparent mx-4">
      <button
        role="tab"
        className={`tab w-1/2 ${activeTab === "Chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
        onClick={() => setActiveTab("Chats")}
      >
        Chats
      </button>

      <button
        role="tab"
        className={`tab w-1/2 ${activeTab === "Contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
        onClick={() => setActiveTab("Contacts")}
      >
        Contacts
      </button>
    </div>
  );
};
