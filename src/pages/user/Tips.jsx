import { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { read, today, write } from "../../utils/storage.js";
const box = { background: "#fff", border: "1px solid #e1e8e4", borderRadius: 18, padding: 20, boxShadow: "0 5px 15px rgba(0,0,0,.05)" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20, margin: "20px 0 35px" };

export function Planner() {
  const plan = [["🌅 MORNING","Morning Run","6:30 AM · 30 min",1],["🌅 MORNING","Healthy Breakfast","8:00 AM"],["🌅 MORNING","Morning Stretch","9:00 AM · 10 min"],["☀️ AFTERNOON","Strength Training","12:30 PM · 45 min",1],["☀️ AFTERNOON","Healthy Lunch","1:30 PM"],["☀️ AFTERNOON","Gym Session","4:30 PM · 40 min",1],["🌙 EVENING","Evening Workout","6:00 PM · 30 min",1],["🌙 EVENING","Healthy Dinner","8:00 PM"],["🌙 EVENING","Cool Down","9:00 PM · 15 min"]];
  return (<><Heading tag="PLAN YOUR DAY" title="Daily Planner" text="Follow your workout and meal plan throughout the day." />
    <div style={grid}>{plan.map(([part, t, time, w]) => (<div style={box} key={t}><small style={{ color: "#15945a", fontWeight: "bold" }}>{part}</small><h3>{t}</h3><span className="plan-time">⏰ {time}</span>{w && <div><Link to="/timer" style={{ display: "inline-block", marginTop: 12, padding: "9px 16px", background: "#15945a", color: "#fff", borderRadius: 8 }}>Start Workout</Link></div>}</div>))}</div></>);
}

export function Nutrition() {
  const [kg, setKg] = useState(70);
  const foods = [["Eggs","6 g protein each"],["Greek Yogurt","10 g per 100 g"],["Oats + Milk","12 g per bowl"],["Chicken + Rice","30 g per plate"],["Paneer Salad","18 g per bowl"],["Dal + Rice","14 g per plate"],["Peanuts","7 g per handful"],["Peanut Butter + Banana","8 g per serving"]];
  return (<><Heading tag="EAT SMART" title="Nutrition" text="Fuel your workouts with protein-rich meals." />
    <div style={box}><h2>💪 How Much Protein Do You Need?</h2><label>Body weight (kg) </label>
      <input type="number" min="20" value={kg} onChange={(e) => setKg(Number(e.target.value))} />
      <p>Target: <strong>{Math.round(kg * 1.2)} – {Math.round(kg * 1.6)} g</strong> per day (1.2–1.6 g per kg).</p></div>
    <div style={grid}>{foods.map(([n, d]) => <div style={box} key={n}><h3>{n}</h3><p style={{ color: "#718096" }}>{d}</p></div>)}</div></>);
}

export function Water() {
  const { user } = useAuth(); const key = `water:${user.email}:${today()}`;
  const [ml, setMl] = useState(read(key, 0)); const goal = 3000;
  const add = (n) => { const v = Math.max(0, ml + n); setMl(v); write(key, v); };
  return (<><Heading tag="STAY HYDRATED" title="Water Tracker" text="Track your hydration through the day." />
    <div style={box}><h2>{ml} / {goal} ml</h2>
      <div style={{ height: 14, background: "#e1e8e4", borderRadius: 8, margin: "12px 0" }}><div style={{ width: Math.min(100, (ml / goal) * 100) + "%", height: "100%", background: "#2d9cdb", borderRadius: 8 }} /></div>
      {[250, 500].map((n) => <button key={n} className="row-btn" style={{ marginRight: 10 }} onClick={() => add(n)}>+ {n} ml</button>)}
      <button className="row-btn danger" onClick={() => add(-ml)}>Reset</button></div></>);
}
