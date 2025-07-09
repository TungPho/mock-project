import React from "react";
import HealthDeclarationForm from "./pages/HealthDeclarationForm";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Root from "./pages/Root";
import HealthRecordsTable from "./pages/HealthRecordsTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HealthDeclarationForm /> },
      { path: "/data", element: <HealthRecordsTable /> },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
