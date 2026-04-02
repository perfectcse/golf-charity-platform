import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/winners.css";

function Winners() {
  const [winners, setWinners] = useState([]);
  const [proof, setProof] = useState("");

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await API.get("/winners");
        setWinners(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWinners();
  }, []);

  const uploadProof = async (winnerId) => {
    try {
      await API.post("/winners/upload-proof", {
        winnerId,
        proofImage: proof,
      });

      alert("Proof uploaded");
    } catch (err) {
      console.log(err);
    }
  };

  const verifyWinner = async (winnerId) => {
    try {
      await API.post("/winners/verify", { winnerId });

      alert("Payment verified");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="winners-container">
          <h1>Winners</h1>

          <div className="winners-card">
            {winners.length === 0 ? (
              <p>No winners yet</p>
            ) : (
              winners.map((w) => (
                <div className="winner-item" key={w._id}>
                  <p><strong>User:</strong> {w.user?.name}</p>
                  <p><strong>Match Count:</strong> {w.matchCount}</p>
                  <p><strong>Status:</strong> {w.paymentStatus}</p>

                  <input
                    type="text"
                    placeholder="Proof Image URL"
                    onChange={(e) => setProof(e.target.value)}
                  />

                  <button onClick={() => uploadProof(w._id)}>
                    Upload Proof
                  </button>

                  <button onClick={() => verifyWinner(w._id)}>
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

export default Winners;