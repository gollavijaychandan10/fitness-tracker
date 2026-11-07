import { Link } from "react-router-dom";
import Heading from "../../components/Heading.jsx";
import { getWorkouts } from "../../utils/storage.js";
const card = { background: "#fff", border: "1px solid #e1e8e4", borderRadius: 18, overflow: "hidden", boxShadow: "0 5px 15px rgba(0,0,0,.05)" };
export default function Workouts() {
  const list = getWorkouts();
  return (<><Heading tag="STAY ACTIVE" title="Workouts" text="Choose a workout and start your fitness journey." />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 25, marginTop: 30 }}>
      {list.map((w) => (<div key={w.id} style={card}>
        {w.image && <img src={w.image} alt={w.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />}
        <div style={{ padding: 20 }}><h2 style={{ margin: "0 0 8px" }}>{w.name}</h2><p style={{ color: "#718096" }}>{w.description}</p>
          <p style={{ fontSize: 14 }}>{w.category} · {w.level} · {w.minutes} min{w.calories > 0 && ` · ${w.calories} kcal`}</p>
          <Link to={`/timer?minutes=${w.minutes}`} className="start-plan" style={{ display: "inline-block", marginTop: 12, padding: "10px 18px", background: "#15945a", color: "#fff", borderRadius: 8, fontWeight: "bold" }}>Start Workout</Link></div></div>))}
      {list.length === 0 && <p>No workouts available right now.</p>}</div></>);
}
