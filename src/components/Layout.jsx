import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const USER_NAV = [["/dashboard","🏠","Dashboard"],["/workouts","🏋️","Workouts"],["/timer","⏱️","Workout Timer"],["/planner","📅","Planner"],["/nutrition","🥗","Nutrition"],["/water","💧","Water"],["/progress","📊","Progress"],["/goals","🎯","Goals"]];
const ADMIN_NAV = [["/admin","🏠","Overview"],["/admin/users","👥","Users"],["/admin/workouts","🏋️","Workouts"]];
export default function Layout({ admin }) {
  const { user, logout } = useAuth(); const nav = useNavigate(); const [open, setOpen] = useState(false);
  const items = admin ? ADMIN_NAV : USER_NAV;
  return (
    <div className={"dashboard-page" + (admin ? " admin-page" : "")}>
      <aside className={"sidebar" + (open ? " open" : "")}>
        <div className="dashboard-logo">✦ FitTrack</div>
        <nav className="side-nav">
          {items.map(([to, ic, label]) => (
            <NavLink key={to} to={to} end={to === "/admin"} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>{ic}<span>{label}</span></NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom"><button onClick={() => { logout(); nav("/login"); }}>↪️<span>Logout</span></button></div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div><button className="mobile-menu" onClick={() => setOpen(!open)}>☰</button>
            {admin ? <span className="admin-badge">ADMIN PANEL</span> : <span className="dashboard-date">FITTRACK</span>}</div>
          <div className="profile-area"><span>{user.name}</span><div className="profile-circle">{user.name.charAt(0).toUpperCase()}</div></div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
