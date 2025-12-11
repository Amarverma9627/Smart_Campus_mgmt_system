import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminResources from "./pages/AdminResources";
import StudentBookings from "./pages/StudentBookings";
import IncidentsPage from "./pages/IncidentsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "SECURITY_STAFF"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/resources"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminResources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/bookings"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/incidents"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SECURITY_STAFF", "STUDENT"]}>
                <IncidentsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
