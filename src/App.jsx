import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Builder from "./pages/Builder";
import AIOnboarding from "./pages/AIOnboarding";
import Templates from "./pages/Templates";
import AdminPanel from "./pages/AdminPanel";
import ProjectSettings from "./pages/ProjectSettings";
import Landing from "./pages/Landing";
import Analytics from "./pages/Analytics";
import MyWebsites from "./pages/MyWebsites";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

// Public Route Component (Redirects to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<Landing />} /> */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/builder/:websiteId"
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-generate"
          element={
            <ProtectedRoute>
              <AIOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route
          path="/settings/:id"
          element={
            <ProtectedRoute>
              <ProjectSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ProjectSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-websites"
          element={
            <ProtectedRoute>
              <MyWebsites />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
