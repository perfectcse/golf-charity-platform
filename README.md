⛳ Golf Charity Draw Platform (MERN Stack)
A full-stack MERN Web Application where users subscribe, select a charity, add scores, participate in draw results, and winners are selected based on score matching. Admin can verify winners and manage the system.

🚀 Live Demo
Frontend:https://golf-charity-platform-frontend.onrender.com

Backend API: https://golf-charity-platform-backend-zg1r.onrender.com

📌 Features
User Features

User Registration & Login (JWT Authentication)
Select Charity
Activate Subscription
Add Scores (1–45)
Store Last 5 Scores
View Draw Results
View Winners
Upload Payment Proof

Admin Features

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
User adds 5 scores (numbers between 1–45)
Admin runs draw
System generates 5 random numbers
System compares user scores with draw numbers
If at least 3 numbers match → Winner created
Admin verifies payment and proof


🏗 Tech Stack
Frontend: React.js, Axios, CSS
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT, Bcrypt
Deployment: Render, MongoDB Atlas

⚙️ Installation & Setup
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev


🔐 Environment Variables (.env)
Create .env file in backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


📡 API Routes



Method
Route
Description




POST
/api/auth/register
Register User


POST
/api/auth/login
Login User


POST
/api/scores
Add Score


GET
/api/scores/:userId
Get User Scores


POST
/api/draw/run
Run Draw


GET
/api/draw
Get Draw Results


GET
/api/winners
Get Winners


POST
/api/winners/upload-proof
Upload Payment Proof


POST
/api/winners/verify
Verify Winner


PUT
/api/users/subscription
Update Subscription


GET
/api/users/:id
Get User




👨‍💻 Author
Your Name
Full Stack MERN Developer

📜 License
This project is for educational and portfolio purposes.
