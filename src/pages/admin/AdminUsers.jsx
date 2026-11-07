import { useState } from "react";
import Heading from "../../components/Heading.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getUsers, saveUsers } from "../../utils/storage.js";
const EMPTY = { name: "", age: "", email: "", password: "", fitnessGoal: "Weight Loss", role: "user" };
export default function AdminUsers() {
  const { user: me } = useAuth(); const [users, setUsers] = useState(getUsers());
  const [q, setQ] = useState(""); const [role, setRole] = useState(""); const [form, setForm] = useState(null); const [editing, setEditing] = useState(null);
  const commit = (l) => { saveUsers(l); setUsers(l); };
  const self = (u) => u.email.toLowerCase() === me.email.toLowerCase();
  const rows = users.filter((u) => (u.name + " " + u.email).toLowerCase().includes(q.toLowerCase()) && (!role || u.role === role));
  const save = (e) => {
    e.preventDefault();
    if (editing) { commit(users.map((u) => u.email === editing ? { ...u, name: form.name, age: form.age, fitnessGoal: form.fitnessGoal, role: self(u) ? u.role : form.role } : u)); }
    else {
      if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) return alert("This email is already registered.");
      commit([...users, { ...form, createdAt: new Date().toISOString() }]);
    }
    setForm(null); setEditing(null);
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (<><Heading tag="ADMINISTRATION" title="Manage Users" text="Search accounts, add, edit, delete and change roles." />
    {form && (<section className="dashboard-card" style={{ margin: "20px 0" }}><div className="card-heading"><div><span>{editing ? "EDIT USER" : "NEW USER"}</span></div></div>
      <form className="admin-form" onSubmit={save}>
        <div><label>Full name</label><input required value={form.name} onChange={set("name")} /></div>
        <div><label>Age</label><input type="number" min="13" max="100" required value={form.age} onChange={set("age")} /></div>
        <div><label>Email</label><input type="email" required readOnly={!!editing} value={form.email} onChange={set("email")} /></div>
        {!editing && <div><label>Password</label><input type="password" minLength="6" required value={form.password} onChange={set("password")} /></div>}
        <div><label>Fitness goal</label><select value={form.fitnessGoal} onChange={set("fitnessGoal")}><option>Weight Loss</option><option>Muscle Gain</option><option>Running</option><option>General Fitness</option></select></div>
        <div><label>Role</label><select value={form.role} onChange={set("role")} disabled={editing && editing.toLowerCase() === me.email.toLowerCase()}><option value="user">User</option><option value="admin">Admin</option></select></div>
        <div className="admin-form-actions"><button type="submit" className="primary">{editing ? "Save Changes" : "Create User"}</button><button type="button" className="secondary" onClick={() => { setForm(null); setEditing(null); }}>Cancel</button></div>
      </form></section>)}
    <div className="admin-toolbar"><input placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}><option value="">All roles</option><option value="user">Users</option><option value="admin">Admins</option></select>
      <button className="row-btn" style={{ padding: "11px 18px" }} onClick={() => { setEditing(null); setForm(EMPTY); }}>+ Add User</button></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>NAME</th><th>EMAIL</th><th>GOAL</th><th>JOINED</th><th>ROLE</th><th>ACTIONS</th></tr></thead>
      <tbody>{rows.map((u) => (<tr key={u.email}><td><strong>{u.name}</strong>{self(u) && <small> (you)</small>}</td><td>{u.email}</td><td>{u.fitnessGoal || "—"}</td><td>{new Date(u.createdAt).toLocaleDateString()}</td>
        <td><span className={"role-badge role-" + (u.role === "admin" ? "admin" : "user")}>{u.role === "admin" ? "Admin" : "User"}</span></td>
        <td><div className="row-actions">
          <button className="row-btn" onClick={() => { setEditing(u.email); setForm({ ...EMPTY, ...u, password: "" }); }}>Edit</button>
          <button className="row-btn" disabled={self(u)} onClick={() => confirm(`Change ${u.name} role?`) && commit(users.map((x) => x.email === u.email ? { ...x, role: x.role === "admin" ? "user" : "admin" } : x))}>{u.role === "admin" ? "Make user" : "Make admin"}</button>
          <button className="row-btn danger" disabled={self(u)} onClick={() => confirm(`Delete ${u.name}?`) && commit(users.filter((x) => x.email !== u.email))}>Delete</button></div></td></tr>))}</tbody></table>
      {rows.length === 0 && <div className="admin-empty">No users match your search.</div>}</div></>);
}
