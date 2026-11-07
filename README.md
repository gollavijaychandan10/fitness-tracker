# FitTrack (React + Vite)
Modules: **Auth** (Login/Signup, Local Storage), **User** (Dashboard, Workouts, Timer, Planner, Nutrition, Water, Progress, Goals), **Admin** (Overview, Users CRUD, Workouts CRUD).
Demo admin: admin@fittrack.com / admin123

    npm install
    npm run dev      # local
    npm run build    # production build (dist/)

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com -> Add New Project -> import the repo (Framework: Vite, build `npm run build`, output `dist`).
3. Deploy. `vercel.json` makes page refreshes on /login, /admin etc. work.
