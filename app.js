const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(
    "mongodb+srv://bamrmagdy_db_user:r1GvIrOyw4W5WxD5@ac-ddm2buj.gaeucvk.mongodb.net/node-auth",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.listen(3000);
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
// //cookies
// app.get("/set-cookies", (req, res) => {
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 100 * 60 * 60 * 24,
//     httpOnly: true,
//   });

//   res.send("you got the cookies");
// });
// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   res.cookie(cookies);
// });
