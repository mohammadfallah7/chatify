import { useAuthStore } from "./stores";

const App = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="z-10">
      Chat
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default App;
