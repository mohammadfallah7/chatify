import {
  LucideLoader,
  LucideLogOut,
  LucideVolume2,
  LucideVolumeOff,
} from "lucide-react";
import { useLogout } from "../../hooks";
import { useAuthStore, useChatStore } from "../../stores";

export const ProfileHeader = () => {
  const user = useAuthStore((s) => s.user);
  const { isMute, toggleSound } = useChatStore();
  const { mutate: logout, loading: isLoggingOut } = useLogout();

  return (
    <div className="border-b border-slate-600/80 mb-4">
      <div className="p-4 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="relative">
            <img
              src={user.profilePic ? user.profilePic : "/avatar.png"}
              alt={user.fullName}
              className="size-11 object-cover"
            />
            <div className="absolute animate-pulse rounded-full size-2 bg-green-600 top-0.5 right-1" />
          </div>

          <div className="-space-y-1">
            <p className="text-xs font-medium line-clamp-1">{user.fullName}</p>
            <small className="text-[11px] text-slate-400">Online</small>
          </div>
        </div>

        <div className="gap-2 flex">
          <button
            className="icon-button"
            onClick={logout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <LucideLoader className="size-4 animate-spin" />
            ) : (
              <LucideLogOut className="size-4" />
            )}
          </button>

          <button className="icon-button" onClick={toggleSound}>
            {isMute ? (
              <LucideVolumeOff className="size-4" />
            ) : (
              <LucideVolume2 className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
