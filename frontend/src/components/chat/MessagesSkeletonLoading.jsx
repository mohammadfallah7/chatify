export const MessagesSkeletonLoading = () => {
  return (
    <ul className="max-w-3xl mx-auto space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((item) => (
        <li
          key={item}
          className={`chat ${item % 2 === 0 ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-bubble bg-slate-800 w-32"></div>
        </li>
      ))}
    </ul>
  );
};
