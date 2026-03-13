import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

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
import AIPromptBuilder from "./pages/AIPromptBuilder";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Help from "./pages/Help";
import LivePreview from "./pages/LivePreview";

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
    return <Navigate to="/dashboard" />;
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
      <Toaster 
        position="bottom-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#ffffff',
            borderRadius: '1.25rem',
            padding: '1rem 1.5rem',
            fontWeight: '600',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          },
          success: {
            iconTheme: {
              primary: '#818cf8',
              secondary: '#1e293b',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#1e293b',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/help" element={<Help />} />

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
          path="/dashboard"
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

        <Route
          path="/ai-architect"
          element={
            <ProtectedRoute>
              <AIPromptBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/preview/:websiteId"
          element={
            <ProtectedRoute>
              <LivePreview />
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
