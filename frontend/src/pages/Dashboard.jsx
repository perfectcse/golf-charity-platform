import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});
  const [scores, setScores] = useState([]);
  const [wins, setWins] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get(`/users/${userId}`);
        setUser(userRes.data);

        const scoreRes = await API.get(`/scores/${userId}`);
        setScores(scoreRes.data);

        const winRes = await API.get("/winners");
        const myWins = winRes.data.filter(
          (w) => w.user?._id === userId
        );
        setWins(myWins);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="dashboard-main">
          <h1 className="dashboard-title">Dashboard</h1>

          <div className="dashboard-cards">
            <div className="stat-card">
              <h3>Total Scores</h3>
              <p>{scores.length}</p>
            </div>

            <div className="stat-card">
              <h3>Subscription</h3>
              <p>{user.subscriptionStatus || "Inactive"}</p>
            </div>

            <div className="stat-card">
              <h3>Selected Charity</h3>
              <p>{user.charity || "Not Selected"}</p>
            </div>

            <div className="stat-card">
              <h3>Draw Participation</h3>
              <p>{scores.length >= 5 ? "Yes" : "No"}</p>
            </div>

            <div className="stat-card">
              <h3>Total Wins</h3>
              <p>{wins.length}</p>
            </div>

            <div className="stat-card">
              <h3>Payment Status</h3>
              <p>
                {wins.length > 0
                  ? wins[0].paymentStatus
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Welcome to Golf Charity Platform</h3>
            <p>
              Manage your scores, charity selection, subscription,
              and participate in draws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;