⛳ Golf Charity Draw Platform (MERN Stack)
A Full Stack MERN Web Application where users subscribe, select a charity, add scores, participate in draw results, and winners are selected based on score matching. Admin can verify winners and manage the system.

🚀 Live Demo
Frontend: (Add after deployment)
Backend API: (Add after deployment)

📌 Features
User

Register & Login (JWT Authentication)
Select Charity
Activate Subscription
Add Scores (1–45)
Store Last 5 Scores
View Draw Results
View Winners
Upload Payment Proof

Admin

Run Draw
Generate Random Draw Numbers
Match User Scores
Create Winners (if match ≥ 3)
Verify Winner Payment
Manage Charities


🧠 System Flow

User registers and logs in
User selects a charity
User activates subscription
User adds 5 scores (1–45)
Admin runs draw
System generates 5 random numbers
System compares scores with draw numbers
If ≥ 3 numbers match → Winner created
Admin verifies payment


🏗 Tech Stack
Frontend: React.js, Axios, CSS
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT, Bcrypt
Deployment: Render, MongoDB Atlas

⚙️ Installation
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev


🔐 Environment Variables (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


👨‍💻 Author
Your Name – Full Stack MERN Developer

📜 License
This project is for educational and portfolio purposes.
