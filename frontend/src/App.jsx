import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Charities from "./pages/Charities";
import Scores from "./pages/Scores";
import Subscription from "./pages/Subscription";
import DrawResults from "./pages/DrawResults";
import Winners from "./pages/Winners";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
          path="/charities"
          element={
            <ProtectedRoute>
              <Charities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scores"
          element={
            <ProtectedRoute>
              <Scores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/draw-results"
          element={
            <ProtectedRoute>
              <DrawResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/winners"
          element={
            <ProtectedRoute>
              <Winners />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;