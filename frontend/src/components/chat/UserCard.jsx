import { useChatStore } from "../../stores/useChatStore";

export const UserCard = ({ user }) => {
  const setTargetUser = useChatStore((s) => s.setTargetUser);

  return (
    <div
      onClick={() => setTargetUser(user)}
      className="p-4 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="avatar avatar-online">
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
