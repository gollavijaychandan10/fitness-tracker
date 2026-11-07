import { Link } from "react-router-dom";
export default function Landing() {
  return (<>
    <header className="main-header"><div className="main-logo">✦ FitTrack</div>
      <nav><Link to="/login">Log In</Link><Link to="/signup" className="nav-button">Get Started</Link></nav></header>
    <section className="hero"><div className="hero-content">
      <span className="hero-label">YOUR FITNESS. YOUR JOURNEY.</span>
      <h1>Train Smart.<br />Live Strong.</h1>
      <p>Track your workouts, monitor your progress, and stay focused on your fitness goals.</p>
      <div className="hero-buttons"><Link to="/signup" className="primary-button">Start Your Journey</Link><Link to="/login" className="secondary-button">Log In</Link></div></div>
      <div className="hero-design"><div className="fitness-circle"><span>FIT</span><strong>TRACK</strong></div></div></section>
    <footer>© 2026 FitTrack. Fitness made simple.</footer></>);
}
