// import HomePage from "../pages/HomePage";
import LoginScreen from "../Auth/LoginScreen";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
//   { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginScreen /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
  },
];

export default routes;
