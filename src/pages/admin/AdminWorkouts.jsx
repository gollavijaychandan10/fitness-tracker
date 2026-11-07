import { useState } from "react";
import Heading from "../../components/Heading.jsx";
import { getWorkouts, saveWorkouts } from "../../utils/storage.js";
const EMPTY = { id: "", name: "", category: "Strength", level: "Beginner", minutes: 30, calories: "", image: "", description: "" };
export default function AdminWorkouts() {
  const [list, setList] = useState(getWorkouts()); const [f, setF] = useState(EMPTY);
  const commit = (l) => { saveWorkouts(l); setList(l); };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = (e) => {
    e.preventDefault();
    const item = { ...f, minutes: Number(f.minutes), calories: Number(f.calories) || 0, id: f.id || "w" + Date.now() };
    commit(f.id ? list.map((w) => (w.id === f.id ? item : w)) : [...list, item]); setF(EMPTY);
  };
  return (<><Heading tag="CONTENT" title="Manage Workouts" text="Everything here is shown on the Workouts page for members." />
    <section className="dashboard-card"><div className="card-heading"><div><span>{f.id ? "EDIT WORKOUT" : "NEW WORKOUT"}</span></div></div>
      <form className="admin-form" onSubmit={save}>
        <div className="full"><label>Name</label><input required maxLength="60" value={f.name} onChange={set("name")} /></div>
        <div><label>Category</label><select value={f.category} onChange={set("category")}>{["Strength","Cardio","HIIT","Yoga","Flexibility"].map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label>Level</label><select value={f.level} onChange={set("level")}>{["Beginner","Intermediate","Advanced"].map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label>Duration (minutes)</label><input type="number" min="1" max="300" required value={f.minutes} onChange={set("minutes")} /></div>
        <div><label>Calories (optional)</label><input type="number" min="0" value={f.calories} onChange={set("calories")} /></div>
        <div className="full"><label>Image link (optional)</label><input type="url" value={f.image} onChange={set("image")} /></div>
        <div className="full"><label>Description</label><textarea maxLength="200" value={f.description} onChange={set("description")} /></div>
        <div className="admin-form-actions"><button type="submit" className="primary">{f.id ? "Save Changes" : "Add Workout"}</button>{f.id && <button type="button" className="secondary" onClick={() => setF(EMPTY)}>Cancel</button>}</div>
      </form></section>
    <div style={{ height: 20 }} />
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>WORKOUT</th><th>CATEGORY</th><th>LEVEL</th><th>DURATION</th><th>KCAL</th><th>ACTIONS</th></tr></thead>
      <tbody>{list.map((w) => (<tr key={w.id}><td><strong>{w.name}</strong><br /><small>{w.description}</small></td><td>{w.category}</td><td>{w.level}</td><td>{w.minutes} min</td><td>{w.calories || "—"}</td>
        <td><div className="row-actions"><button className="row-btn" onClick={() => { setF(w); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
          <button className="row-btn danger" onClick={() => confirm(`Delete "${w.name}"?`) && commit(list.filter((x) => x.id !== w.id))}>Delete</button></div></td></tr>))}</tbody></table>
      {list.length === 0 && <div className="admin-empty">No workouts added yet.</div>}</div></>);
}
