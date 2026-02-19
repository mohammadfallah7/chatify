import { useContacts } from "../../hooks";
import { UserCard } from "./UserCard";
import { UsersSkeletonLoading } from "./UsersSkeletonLoading";

export const ContactsList = () => {
  const { data, loading } = useContacts();

  if (loading) return <UsersSkeletonLoading />;

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <UserCard key={item._id} user={item} />
      ))}
    </div>
  );
};
