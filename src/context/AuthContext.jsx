import { createContext, useContext, useState } from "react";
import { getUsers, saveUsers, read, write } from "../utils/storage.js";
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { getUsers(); return read("fitTrackCurrent", null); });
  const signup = (d) => {
    const list = getUsers();
    if (list.some((u) => u.email.toLowerCase() === d.email.toLowerCase())) throw new Error("This email is already registered.");
    saveUsers([...list, { ...d, createdAt: new Date().toISOString() }]);
  };
  const login = (email, password) => {
    const u = getUsers().find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (!u) throw new Error("Invalid email or password.");
    const { password: _p, ...safe } = u; write("fitTrackCurrent", safe); setUser(safe); return safe;
  };
  const logout = () => { localStorage.removeItem("fitTrackCurrent"); setUser(null); };
  return <Ctx.Provider value={{ user, signup, login, logout }}>{children}</Ctx.Provider>;
}
