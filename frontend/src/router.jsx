import { createBrowserRouter } from "react-router";
import App from "./App";
import { LoginPage, SignupPage } from "./pages";
import Layout from "./Layout";
import ProtectRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        Component: ProtectRoute,
        children: [
          {
            index: true,
            Component: App,
          },
        ],
      },
      {
        path: "signup",
        Component: SignupPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
]);

export default router;
