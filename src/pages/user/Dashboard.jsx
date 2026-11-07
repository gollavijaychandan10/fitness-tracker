import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getGoals, getHistory, today } from "../../utils/storage.js";
export default function Dashboard() {
  const { user } = useAuth(); const g = getGoals(user.email);
  const a = getHistory(user.email).find((h) => h.date === today()) || { steps: 0, calories: 0, distance: 0, activeTime: 0 };
  const pct = Math.min(100, Math.round(((a.steps / g.steps + a.calories / g.calories + a.activeTime / g.activeTime) / 3) * 100));
  const stats = [["👟","Steps",a.steps.toLocaleString(),`of ${g.steps.toLocaleString()} daily goal`],["🔥","Calories",a.calories,"kcal burned today"],["📍","Distance",a.distance+" km","daily distance"],["⏱️","Active Time",a.activeTime+" min","active minutes today"]];
  return (<>
    <section className="dashboard-welcome"><div><span>WELCOME BACK</span><h1>{user.name} 👋</h1><p>Here's your fitness activity for today.</p></div><Link to="/timer" className="start-workout-button">▶ Start Workout</Link></section>
    <section className="stats-grid">{stats.map(([i, t, v, s]) => (<div className="stat-card" key={t}><div className="stat-icon">{i}</div><div><p>{t}</p><h2>{v}</h2><small>{s}</small></div></div>))}</section>
    <section className="dashboard-grid"><div className="dashboard-card">
      <div className="card-heading"><div><span>DAILY ACTIVITY</span><h2>Today's Goal</h2></div><strong>{pct}%</strong></div>
      <div className="progress-circle" style={{ background: `conic-gradient(#15945a ${pct * 3.6}deg, #e1e8e4 0deg)` }}><div className="circle-content"><strong>{pct}%</strong><span>Complete</span></div></div>
      <div className="goal-details"><div><span>Steps</span><strong>{a.steps} / {g.steps}</strong></div><div><span>Calories</span><strong>{a.calories} / {g.calories} kcal</strong></div><div><span>Active Time</span><strong>{a.activeTime} / {g.activeTime} min</strong></div></div>
    </div>
    <div className="dashboard-card"><div className="card-heading"><div><span>QUICK ACTIONS</span><h2>What next?</h2></div></div>
      <div className="quick-grid">{[["/timer","⏱️","Start Timer"],["/goals","🎯","Set Goals"],["/nutrition","🥗","Nutrition"],["/water","💧","Add Water"]].map(([to, i, t]) => (<Link key={to} to={to} className="quick-card"><span>{i}</span><strong>{t}</strong></Link>))}</div></div></section></>);
}
