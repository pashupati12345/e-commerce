const express = require("express");
const cors = require("cors");
const routes = require("./routes"); 
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api", routes);

module.exports = app;