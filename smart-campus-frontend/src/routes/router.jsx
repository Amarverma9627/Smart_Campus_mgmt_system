import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminResources from "./pages/AdminResources";
import StudentBookings from "./pages/StudentBookings";
import IncidentsPage from "./pages/IncidentsPage";
import NotFound from "./pages/NotFound";

export const approute =createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        allowedRoles={["STUDENT", "ADMIN", "SECURITY_STAFF"]}
      >
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/resources",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AdminResources />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/bookings",
    element: (
      <ProtectedRoute allowedRoles={["STUDENT"]}>
        <StudentBookings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/incidents",
    element: (
      <ProtectedRoute
        allowedRoles={["ADMIN", "SECURITY_STAFF", "STUDENT"]}
      >
        <IncidentsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute
        allowedRoles={["STUDENT", "ADMIN", "SECURITY_STAFF"]}
      >
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

