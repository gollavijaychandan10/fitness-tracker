import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../../components/Heading.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { addHistory } from "../../utils/storage.js";
const pad = (n) => String(n).padStart(2, "0");
export default function Timer() {
  const { user } = useAuth(); const nav = useNavigate(); const [q] = useSearchParams();
  const first = Number(q.get("minutes")) || 0;
  const [total, setTotal] = useState(first * 60); const [left, setLeft] = useState(first * 60); const [run, setRun] = useState(false);
  const id = useRef(null);
  useEffect(() => {
    if (!run) return;
    id.current = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id.current);
  }, [run]);
  useEffect(() => {
    if (run && left <= 0) {
      setRun(false);
      const m = Math.max(1, Math.round(total / 60)), r = m / 30;
      addHistory(user.email, { activeTime: m, calories: Math.round(280 * r), distance: +(3.5 * r).toFixed(2), steps: Math.round(3500 * r) });
      alert("Workout completed! Your dashboard has been updated. 💪"); nav("/dashboard");
    }
  }, [left, run]);
  const preset = (m) => { setRun(false); setTotal(m * 60); setLeft(m * 60); };
  return (<><Heading tag="STAY ACTIVE" title="Workout Timer" text="Time your workout and track your activity." />
    <section className="timer-page"><div className="timer-card-main"><span className="timer-status">WORKOUT TIMER</span>
      <div className="timer-display"><span>{pad(Math.floor(Math.max(0, left) / 60))}</span><span>:</span><span>{pad(Math.max(0, left) % 60)}</span></div><p>Minutes : Seconds</p>
      <div className="timer-presets">{[1, 5, 10, 30].map((m) => <button key={m} onClick={() => preset(m)}>{m} Min</button>)}</div>
      <div className="timer-controls"><button className="timer-start" onClick={() => left > 0 ? setRun(true) : alert("Choose a time first.")}>▶ Start</button>
        <button className="timer-pause" onClick={() => setRun(false)}>❚❚ Pause</button><button className="timer-reset" onClick={() => preset(0)}>↻ Reset</button></div></div></section></>);
}
