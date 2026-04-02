import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/draw.css";

function DrawResults() {
  const [draws, setDraws] = useState([]);

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const res = await API.get("/draw");
        setDraws(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDraws();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="draw-container">
          <h1>Draw Results</h1>

          {draws.length === 0 ? (
            <p>No draw results yet</p>
          ) : (
            draws.map((draw) => (
              <div className="draw-card" key={draw._id}>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(draw.createdAt).toLocaleDateString()}
                </p>

                <div className="draw-numbers">
                  {draw.numbers.map((num, index) => (
                    <span key={index} className="number">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DrawResults;