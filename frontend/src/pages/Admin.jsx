import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/admin.css";

function Admin() {
  const [winners, setWinners] = useState([]);

  const loadWinners = async () => {
    const res = await API.get("/winners");
    setWinners(res.data);
  };

  const runDraw = async () => {
    await API.post("/draw/run");
    alert("Draw Executed");
    loadWinners();
  };

  const verifyWinner = async (winnerId) => {
    await API.post("/winners/verify", { winnerId });
    alert("Winner Verified");
    loadWinners();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/winners");
      setWinners(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="admin-page">
          <h1>Admin Panel</h1>

          <div className="admin-card">
            <h3>Run Lucky Draw</h3>
            <button className="draw-btn" onClick={runDraw}>
              Run Draw
            </button>
          </div>

          <div className="admin-card">
            <h3>Winners</h3>

            {winners.length === 0 ? (
              <p>No winners yet</p>
            ) : (
              winners.map((w) => (
                <div className="winner-card" key={w._id}>
                  <p><strong>User:</strong> {w.user?.name}</p>
                  <p><strong>Match Count:</strong> {w.matchCount}</p>
                  <p><strong>Status:</strong> {w.paymentStatus}</p>

                  <button
                    className="verify-btn"
                    onClick={() => verifyWinner(w._id)}
                  >
                    Verify Payment
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;