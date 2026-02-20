import {
  LucideLoader,
  LucideLogOut,
  LucideVolume2,
  LucideVolumeOff,
} from "lucide-react";
import { useRef } from "react";
import { useLogout, useUploadProfilePicture } from "../../hooks";
import { useAuthStore, useChatStore } from "../../stores";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

export const ProfileHeader = () => {
  const user = useAuthStore((s) => s.user);
  const { isMute, toggleSound } = useChatStore();
  const { mutate: logout, loading: isLoggingOut } = useLogout();
  const fileInputRef = useRef(null);
  const {
    mutate,
    isPending: isUpdatingProfile,
    data: selectedImage,
  } = useUploadProfilePicture();

  return (
    <div className="border-b border-slate-700/50 mb-4">
      <div className="p-4 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="avatar avatar-online">
            <button
              className="size-12 rounded-full overflow-hidden cursor-pointer relative group"
              onClick={() => fileInputRef.current.click()}
              disabled={isUpdatingProfile}
            >
              <img
                src={selectedImage || user.profilePic || "/avatar.png"}
                alt={user.fullName + " " + "avatar image"}
                className="object-cover"
              />

              {isUpdatingProfile ? (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
                  <LucideLoader className="size-3 animate-spin" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </div>
              )}
            </button>
            <input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              onChange={mutate}
              className="hidden"
            />
          </div>

          <div className="-space-y-1 pointer-events-none">
            <p className="text-xs font-medium line-clamp-1 text-slate-200">
              {user.fullName}
            </p>
            <small className="text-[11px] text-slate-400">Online</small>
          </div>
        </div>

        <div className="gap-2 flex items-center">
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

          <button
            className="icon-button"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((err) => console.error("Audio play failed:", err));
              toggleSound();
            }}
          >
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
