export const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
export const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const today = () => new Date().toISOString().slice(0, 10);
const U = "https://images.unsplash.com/";
export const DEFAULT_GOALS = { steps: 10000, calories: 650, distance: 5, activeTime: 60 };
export const DEFAULT_WORKOUTS = [
  { id: "d1", name: "Running", category: "Cardio", level: "Beginner", minutes: 30, calories: 280, description: "Improve stamina and cardiovascular fitness.", image: U + "photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80" },
  { id: "d2", name: "Strength Training", category: "Strength", level: "Intermediate", minutes: 45, calories: 350, description: "Build strength with full-body exercises.", image: U + "photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80" },
  { id: "d3", name: "Gym Workout", category: "Strength", level: "Intermediate", minutes: 40, calories: 320, description: "Train different muscle groups at the gym.", image: U + "photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80" },
  { id: "d4", name: "Cycling", category: "Cardio", level: "Beginner", minutes: 30, calories: 250, description: "Improve endurance and leg strength.", image: U + "photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80" },
  { id: "d5", name: "Yoga", category: "Yoga", level: "Beginner", minutes: 30, calories: 150, description: "Improve flexibility, balance and relaxation.", image: U + "photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80" },
  { id: "d6", name: "Home Workout", category: "HIIT", level: "Beginner", minutes: 25, calories: 220, description: "Simple exercises that can be done at home.", image: U + "photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80" },
];
// users: seeded with a demo admin so reviewers can log in immediately
export const getUsers = () => {
  let u = read("fitTrackUsers", null);
  if (!u) { u = [{ name: "Admin", age: 30, email: "admin@fittrack.com", password: "admin123", fitnessGoal: "General Fitness", role: "admin", createdAt: new Date().toISOString() }]; write("fitTrackUsers", u); }
  return u;
};
export const saveUsers = (u) => write("fitTrackUsers", u);
export const getWorkouts = () => read("fitTrackWorkouts", DEFAULT_WORKOUTS);
export const saveWorkouts = (w) => write("fitTrackWorkouts", w);
export const getGoals = (email) => ({ ...DEFAULT_GOALS, ...read("goals:" + email, {}) });
export const getHistory = (email) => read("history:" + email, []);
export const addHistory = (email, g) => {
  const h = getHistory(email); const d = today();
  let e = h.find((x) => x.date === d);
  if (!e) { e = { date: d, workouts: 0, calories: 0, steps: 0, distance: 0, activeTime: 0 }; h.push(e); }
  e.workouts += 1; e.calories += g.calories; e.steps += g.steps; e.distance = +(e.distance + g.distance).toFixed(2); e.activeTime += g.activeTime;
  write("history:" + email, h);
};
