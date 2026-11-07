import Heading from "../../components/Heading.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getHistory } from "../../utils/storage.js";
function Bars({ title, tag, data, unit }) {
  const max = Math.max(1, ...data.map((d) => d.v));
  return (<section className="dashboard-card progress-card"><div className="card-heading"><div><span>{tag}</span><h2>{title}</h2></div></div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 180, padding: "10px 0" }}>
      {data.map((d) => (<div key={d.day} style={{ flex: 1, textAlign: "center", fontSize: 12 }}><div style={{ fontWeight: "bold" }}>{d.v}</div>
        <div style={{ height: (d.v / max) * 120 + 2, background: "#15945a", borderRadius: 6 }} title={d.v + " " + unit}></div>{d.day}</div>))}</div></section>);
}
export default function Progress() {
  const { user } = useAuth(); const h = getHistory(user.email);
  const week = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const e = h.find((x) => x.date === d.toISOString().slice(0, 10)) || {}; return { day: d.toLocaleDateString("en-US", { weekday: "short" }), e }; });
  const col = (k) => week.map((w) => ({ day: w.day, v: w.e[k] || 0 })); const sum = (k) => col(k).reduce((a, b) => a + b.v, 0);
  return (<><Heading tag="FITNESS PROGRESS" title="Your Progress 📊" text="Track your workout activity and daily fitness progress." />
    <section className="stats-grid">{[["🏋️","Workouts",sum("workouts")],["🔥","Calories",sum("calories")],["👟","Steps",sum("steps").toLocaleString()],["⏱️","Active Time",sum("activeTime")+" min"]].map(([i, t, v]) => (<div className="stat-card" key={t}><div className="stat-icon">{i}</div><div><p>{t}</p><h2>{v}</h2><small>this week</small></div></div>))}</section>
    <Bars tag="WEEKLY WORKOUT" title="Workout Minutes" data={col("activeTime")} unit="min" />
    <Bars tag="DAILY CALORIES" title="Calories Burned" data={col("calories")} unit="kcal" />
    <Bars tag="DAILY STEPS" title="Steps Completed" data={col("steps")} unit="steps" /></>);
}
