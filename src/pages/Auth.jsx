import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { home } from "../App.jsx";

function Shell({ title, sub, side, children }) {
  return (<div className="auth-page"><div className="auth-box">
    <div className="auth-design"><div className="auth-logo">✦ FitTrack</div><div className="auth-shape shape-one"></div><div className="auth-shape shape-two"></div>
      <div className="auth-design-content"><span>FITNESS TRACKER</span><h1>{side}</h1><p>Track your activity, set goals and become a better version of yourself.</p></div></div>
    <div className="auth-form"><div className="form-content"><h2>{title}</h2><p className="form-subtitle">{sub}</p>{children}</div></div></div></div>);
}

export function Login() {
  const { user, login } = useAuth(); const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "" }); const [err, setErr] = useState("");
  if (user) return <Navigate to={home(user)} replace />;
  const submit = (e) => { e.preventDefault(); try { nav(home(login(f.email.trim(), f.password))); } catch (x) { setErr(x.message); } };
  return (<Shell title="Welcome Back" sub="Log in to continue your fitness journey." side={<>Train Smart.<br />Live Strong.</>}>
    <form onSubmit={submit}>
      <label>Email Address</label><input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Enter your email" />
      <label>Password</label><input type="password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} placeholder="Enter your password" />
      {err && <p style={{ color: "#c0392b" }}>{err}</p>}
      <button type="submit" className="auth-button">Log In</button>
    </form>
    <p className="switch-auth">Don't have an account? <Link to="/signup">Create Account</Link></p>
    <p style={{ fontSize: 12, color: "#7d8882" }}>Demo admin: admin@fittrack.com / admin123</p>
  </Shell>);
}

export function Signup() {
  const { signup } = useAuth(); const nav = useNavigate(); const [err, setErr] = useState("");
  const [f, setF] = useState({ name: "", age: "", email: "", password: "", fitnessGoal: "", role: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); try { signup({ ...f, name: f.name.trim(), email: f.email.trim() }); alert("Account created! Please log in."); nav("/login"); } catch (x) { setErr(x.message); } };
  return (<Shell title="Create Account" sub="Start your fitness journey with FitTrack." side={<>Build Your<br />Stronger Self.</>}>
    <form onSubmit={submit}>
      <label>Full Name</label><input required value={f.name} onChange={set("name")} />
      <label>Age</label><input type="number" min="13" max="100" required value={f.age} onChange={set("age")} />
      <label>Email Address</label><input type="email" required value={f.email} onChange={set("email")} />
      <label>Password</label><input type="password" minLength="6" required value={f.password} onChange={set("password")} />
      <label>Fitness Goal</label>
      <select required value={f.fitnessGoal} onChange={set("fitnessGoal")}><option value="">Select your goal</option><option>Weight Loss</option><option>Muscle Gain</option><option>Running</option><option>General Fitness</option></select>
      <label>Account Role</label>
      <select required value={f.role} onChange={set("role")}><option value="">Select your role</option><option value="user">User</option><option value="admin">Admin</option></select>
      {err && <p style={{ color: "#c0392b" }}>{err}</p>}
      <button type="submit" className="auth-button">Create Account</button>
    </form>
    <p className="switch-auth">Already have an account? <Link to="/login">Log In</Link></p>
  </Shell>);
}
