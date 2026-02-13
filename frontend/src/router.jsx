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
        path: "login",
        Component: LoginPage,
      },
      {
        path: "signup",
        Component: SignupPage,
      },
      {
        Component: ProtectRoute,
        children: [
          {
            index: true,
            Component: App,
          },
        ],
      },
    ],
  },
]);

export default router;
