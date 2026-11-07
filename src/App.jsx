import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import { Login, Signup } from "./pages/Auth.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import Workouts from "./pages/user/Workouts.jsx";
import Timer from "./pages/user/Timer.jsx";
import Goals from "./pages/user/Goals.jsx";
import Progress from "./pages/user/Progress.jsx";
import { Planner, Nutrition, Water } from "./pages/user/Tips.jsx";
import Overview from "./pages/admin/Overview.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminWorkouts from "./pages/admin/AdminWorkouts.jsx";

export const home = (u) => (u.role === "admin" ? "/admin" : "/dashboard");

// Role guard: not logged in -> /login; wrong role -> own home
function Guard({ role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if ((user.role === "admin") !== (role === "admin")) return <Navigate to={home(user)} replace />;
  return <Layout admin={role === "admin"} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Guard role="user" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/water" element={<Water />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/goals" element={<Goals />} />
      </Route>
      <Route element={<Guard role="admin" />}>
        <Route path="/admin" element={<Overview />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/workouts" element={<AdminWorkouts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
