import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AdminResources from "../pages/AdminResources";
import StudentBookings from "../pages/StudentBookings";
import IncidentsPage from "../pages/IncidentsPage";
import NotFound from "../pages/NotFound";
import BookingsPage from "../pages/BookingsPage";

const approuter = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },

  // Protected routes wrapper (common layout could be added here)
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
   
  { path: "/signup", element: <Signup /> },
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
    path: "/bookings",
    element: (
      <ProtectedRoute
        allowedRoles={["ADMIN", "STUDENT", "SECURITY_STAFF"]}
      >
        <BookingsPage />
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

  // 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default approuter;
