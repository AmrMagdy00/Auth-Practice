require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleWare");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");
const dbURI = process.env.MONGO_URI;

// database connection
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.listen(3000);
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
