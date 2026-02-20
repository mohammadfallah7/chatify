import { useChatStore, useSocketStore } from "../../stores";

export const UserCard = ({ user }) => {
  const setTargetUser = useChatStore((s) => s.setTargetUser);
  const onlineUserIds = useSocketStore((s) => s.onlineUserIds);

  const isOnline = onlineUserIds.some((i) => i === user._id);

  return (
    <div
      onClick={() => setTargetUser(user)}
      className="p-4 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="size-10 rounded-full">
            <img
              src={user.profilePic || "/avatar.png"}
              alt={`${user.fullName} avatar`}
              className="object-cover"
            />
          </div>
        </div>

        <p className="font-medium text-slate-200 truncate">{user.fullName}</p>
      </div>
    </div>
  );
};
