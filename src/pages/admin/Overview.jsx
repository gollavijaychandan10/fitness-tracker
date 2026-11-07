import { Link } from "react-router-dom";
import { getUsers, getWorkouts } from "../../utils/storage.js";
export default function Overview() {
  const users = getUsers(); const admins = users.filter((u) => u.role === "admin"); const members = users.filter((u) => u.role !== "admin");
  const goals = {}; members.forEach((u) => { const g = u.fitnessGoal || "Not set"; goals[g] = (goals[g] || 0) + 1; });
  const recent = [...users].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 5);
  const stats = [["👥","Total Accounts",users.length],["🏃","Members",members.length],["🛡️","Admins",admins.length],["🏋️","Library Workouts",getWorkouts().length]];
  return (<>
    <section className="dashboard-welcome"><div><span>WELCOME ADMIN</span><h1>Admin Dashboard</h1><p>A summary of FitTrack members and content.</p></div><Link to="/admin/users" className="start-workout-button">Manage Users</Link></section>
    <section className="stats-grid">{stats.map(([i, t, v]) => <div className="stat-card" key={t}><div className="stat-icon">{i}</div><div><p>{t}</p><h2>{v}</h2></div></div>)}</section>
    <section className="dashboard-grid">
      <div className="dashboard-card"><div className="card-heading"><div><span>MEMBERS</span><h2>Fitness Goals</h2></div></div>
        {Object.keys(goals).length === 0 ? <div className="admin-empty">No members yet.</div> : Object.entries(goals).map(([g, c]) => (<div className="breakdown-row" key={g}><div><span>{g}</span><strong>{c}</strong></div><div className="breakdown-bar"><span style={{ width: Math.round((c / members.length) * 100) + "%" }}></span></div></div>))}</div>
      <div className="dashboard-card"><div className="card-heading"><div><span>LATEST</span><h2>Recent Sign-ups</h2></div></div>
        {recent.map((u) => (<div className="workout-item" key={u.email}><div className="workout-icon">{u.name.charAt(0).toUpperCase()}</div><div className="workout-info"><h3>{u.name}</h3><p>{u.email}</p></div><span className={"role-badge role-" + (u.role === "admin" ? "admin" : "user")}>{u.role === "admin" ? "Admin" : "User"}</span></div>))}</div></section></>);
}
