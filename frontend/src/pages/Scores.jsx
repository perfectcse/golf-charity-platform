import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/scores.css";

function Scores() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch Scores
  const fetchScores = useCallback(async () => {
    try {
      const res = await API.get(`/scores/${userId}`);
      setScores(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  // Add Score
  const addScore = async () => {
    if (!score || score < 1 || score > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    try {
      setLoading(true);

      await API.post("/scores", {
        userId,
        score: Number(score),
      });

      setScore("");
      fetchScores();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Load Scores on Page Load
  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="scores-container">
          <h1>Scores</h1>

          <div className="score-card">
            <h3>Add Score</h3>

            <input
              type="number"
              placeholder="Enter score (1-45)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />

            <button onClick={addScore} disabled={loading}>
              {loading ? "Adding..." : "Add Score"}
            </button>
          </div>

          <div className="score-card">
            <h3>Your Last 5 Scores</h3>

            <div className="score-list">
              {scores.length === 0 ? (
                <p>No scores yet</p>
              ) : (
                scores.map((s) => (
                  <div className="score-item" key={s._id}>
                    <span>Score: {s.score}</span>
                    <span>
                      {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scores;