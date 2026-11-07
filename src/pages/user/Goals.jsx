import { useState } from "react";
import Heading from "../../components/Heading.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { DEFAULT_GOALS, getGoals, write } from "../../utils/storage.js";
const FIELDS = [["steps","👟","Daily Steps","steps per day",1000,1],["calories","🔥","Daily Calories","kcal per day",100,1],["distance","📍","Daily Distance","km per day",1,0.1],["activeTime","⏱️","Active Time","minutes per day",10,1]];
export default function Goals() {
  const { user } = useAuth(); const [g, setG] = useState(getGoals(user.email));
  const save = () => { write("goals:" + user.email, g); alert("Goals saved!"); };
  return (<><Heading tag="SET YOUR TARGETS" title="My Fitness Goals" text="Customize your daily fitness targets." />
    <section className="goals-grid">{FIELDS.map(([k, ic, t, unit, min, step]) => (<div className="goal-card" key={k}><div className="goal-icon">{ic}</div><h3>{t}</h3>
      <input type="number" min={min} step={step} value={g[k]} onChange={(e) => setG({ ...g, [k]: Number(e.target.value) })} /><span>{unit}</span></div>))}</section>
    <div className="goal-actions"><button className="reset-button" onClick={() => setG(DEFAULT_GOALS)}>↻ Reset All Goals</button><button className="save-button" onClick={save}>✓ Save Goals</button></div>
    <div className="info-box">💡 Set realistic targets and increase them gradually as your fitness improves.</div></>);
}
