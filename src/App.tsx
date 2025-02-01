import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SingleUserPage } from "./pages/SingleUserPage";
import { UsersPage } from "./pages/UsersPage";
import { NoPage } from "./pages/NoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/1" />,
  },
  {
    path: "/:pageid",
    element: <UsersPage />,
  },
  {
    path: "/user/:userId",
    element: <SingleUserPage />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
