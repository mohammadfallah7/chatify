import { LucideLoader } from "lucide-react";

export const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LucideLoader className="size-10 animate-spin" />
    </div>
  );
};
