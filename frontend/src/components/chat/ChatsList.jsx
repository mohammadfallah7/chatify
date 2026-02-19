import { useChatPartners } from "../../hooks";
import { NoChatsFound } from "./NoChatsFound";
import { UserCard } from "./UserCard";
import { UsersSkeletonLoading } from "./UsersSkeletonLoading";

export const ChatsList = () => {
  const { data, loading } = useChatPartners();

  if (loading) return <UsersSkeletonLoading />;

  if (data.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <UserCard key={item._id} user={item} />
      ))}
    </div>
  );
};
