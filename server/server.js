require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");

connectDB(process.env.DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Include the allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Include the allowed headers, including Content-Type
  next();
});

app.use("/signup", require("./routes/signup"));

app.use("/login", require("./routes/login"));

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route not found");
});

app.use(require("./utils/errorHandler"));

app.listen(process.env.PORT);
