import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">Golf Platform</h2>

      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/charities">Charities</NavLink></li>
        <li><NavLink to="/scores">Scores</NavLink></li>
        <li><NavLink to="/subscription">Subscription</NavLink></li>
        <li><NavLink to="/draw-results">Draw Results</NavLink></li>
        <li><NavLink to="/winners">Winners</NavLink></li>
        <li><NavLink to="/admin">Admin</NavLink></li>
      </ul>

      <button className="sidebar-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;