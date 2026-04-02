import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import redcross from "../assets/redcross.png";
import unicef from "../assets/unicef.png";
import savethechildren from "../assets/savethechildren.png";
import wwf from "../assets/wwf.png";

import "../styles/charities.css";

function Charities() {
  const [charities, setCharities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const charityImages = {
    "Red Cross": redcross,
    "UNICEF": unicef,
    "Save the Children": savethechildren,
    "WWF": wwf,
  };

  // Load charities
  useEffect(() => {
    const loadCharities = async () => {
      try {
        const res = await API.get("/charities");
        setCharities(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCharities();
  }, []);

  // Add charity
  const addCharity = async () => {
    try {
      await API.post("/charities", {
        name,
        description,
        image: "",
      });

      setName("");
      setDescription("");

      const res = await API.get("/charities");
      setCharities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Select charity
  const selectCharity = async (charityName) => {
    try {
      const userId = localStorage.getItem("userId");

      await API.post("/charities/select", {
        userId,
        charityName,
      });

      alert("Charity Selected");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="charity-page">
          <h1>Charities</h1>

          {/* Charity Cards */}
          <div className="charity-grid">
            {charities.map((charity) => (
              <div className="charity-card" key={charity._id}>
                <img
                  src={
                    charity.image
                      ? charity.image
                      : charityImages[charity.name]
                  }
                  alt={charity.name}
                />

                <h3>{charity.name}</h3>
                <p>{charity.description}</p>

                <button
                  className="select-btn"
                  onClick={() => selectCharity(charity.name)}
                >
                  Select Charity
                </button>
              </div>
            ))}
          </div>

          {/* Add Charity Form Bottom */}
          <div className="add-charity">
            <h2>Add New Charity</h2>

            <input
              type="text"
              placeholder="Charity Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={addCharity}>
              Add Charity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charities;