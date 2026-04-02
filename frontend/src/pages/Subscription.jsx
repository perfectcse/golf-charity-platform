import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/subscription.css";

function Subscription() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [userId]);

  const toggleSubscription = async () => {
    try {
      await API.put("/users/subscription", { userId });

      // reload user after update
      const res = await API.get(`/users/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <div className="subscription-container">
          <h1>Subscription</h1>

          <div className="subscription-card">
            <h3>Status</h3>

            <p
              className={
                user.subscriptionStatus === "Active"
                  ? "active"
                  : "inactive"
              }
            >
              {user.subscriptionStatus || "Inactive"}
            </p>

            <p>
              End Date:{" "}
              {user.subscriptionEndDate
                ? new Date(user.subscriptionEndDate).toLocaleDateString()
                : "N/A"}
            </p>

            <button onClick={toggleSubscription}>
              {user.subscriptionStatus === "Active"
                ? "Deactivate Subscription"
                : "Activate Subscription"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;