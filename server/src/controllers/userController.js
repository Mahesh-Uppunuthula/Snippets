const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");
const { log } = require("console");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.send("user already exists");
    }

    // hashing passwords with bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      const newUser = new UserModel({ email, password: hashedPassword });
      newUser
        .save()
        .then(() => {
          res.send("Registered Succuessfully!");
        })
        .catch((err) => {
          res.send("Something went wrong, Please try again later");
          console.error("Registration error", err);
        });
    });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("login", email, password);
  UserModel.findOne({ email }).then((foundUser) => {
    // if foundUser is null
    if (!foundUser) {
        console.error("User doesn't exist");
      return res.json({ message: "User doesn't exist" });
    }

    bcrypt.compare(password, foundUser.password).then((isMatch) => {
      if (!isMatch) {
        console.error("password doesn't match");
        return res.json({ message: "Username or Password Incorrect" });
      }

      console.log("Authenticated User");

      const token = jwt.sign({ id: foundUser._id }, JWT_SECRET_KEY);
      res.json({ token, UserID: foundUser._id });
    });
  });
};
