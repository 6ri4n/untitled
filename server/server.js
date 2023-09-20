require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");

connectDB(process.env.DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/signup", require("./routes/signup"));

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route not found");
});

app.use(require("./utils/errorHandler"));

app.listen(process.env.PORT);
