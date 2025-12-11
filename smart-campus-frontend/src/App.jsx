import React from "react";
import {  RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import approuter from "./routes/router";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={approuter} />
    </AuthProvider>
  );
}

export default App;
