import { LucideX } from "lucide-react";
import { useChatStore, useSocketStore } from "../../stores";
import { useEffect } from "react";

export const ChatHeader = () => {
  const { targetUser, setTargetUser } = useChatStore();
  const onlineUserIds = useSocketStore((s) => s.onlineUserIds);

  const isOnline = onlineUserIds.some((i) => i === targetUser._id);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setTargetUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setTargetUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 py-4">
      <div className="flex items-center gap-3">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-12 rounded-full">
            <img
              src={targetUser.profilePic || "/avatar.png"}
              alt={targetUser.fullName + " " + "avatar image"}
              className="object-cover"
            />
          </div>
        </div>

        <div className="-space-y-1 pointer-events-none">
          <p className="text-xs font-medium line-clamp-1 text-slate-200">
            {targetUser.fullName}
          </p>
          <small className="text-[11px] text-slate-400">
            {isOnline ? "Online" : "Offline"}
          </small>
        </div>
      </div>

      <button onClick={() => setTargetUser(null)} className="icon-button">
        <LucideX className="size-4" />
      </button>
    </div>
  );
};
