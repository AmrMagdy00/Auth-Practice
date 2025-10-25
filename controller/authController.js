const User = require("../models/User");
const jwt = require("jsonwebtoken");
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect rmail
  if (err.message === "Incorrect Email") {
    errors.email = "That email is not registered";
  }
  //incorrect password

  if (err.message === "Incorrect Password") {
    errors.password = "That Password is incorrect";
  }
  // 1️⃣ Duplicate email error (unique constraint)
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // 2️⃣ Validation errors from Mongoose
  if (err.message.includes("validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Amr DB Secret Key", { expiresIn: maxAge });
};
class AuthController {
  async signup_get(req, res) {
    res.render("signup");
  }

  async signup_post(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
      res.status(400).json({ errors });
    }
  }

  login_get(req, res) {
    res.render("login");
  }

  async login_post(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      log(errors);
      res.status(400).json({ errors });
    }
  }
}

module.exports = new AuthController();
