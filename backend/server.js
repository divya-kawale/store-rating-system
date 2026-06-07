require("dotenv").config();

const express = require("express");
const cors = require("cors");


const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});