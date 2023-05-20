const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.send("user already exists");
    }

    // hashing passwords with bcrypt
    bcrypt
      .hash(password, 10, (err, hashedPassword) => {
        const newUser = new UserModel({ email, password:hashedPassword });
        newUser
          .save()
          .then(() => {
            res.send("Registered Succuessfully!");
          })
          .catch((err) => {
            res.send("Something went wrong, Please try again later");
            console.error("Registration error", err);
          });
      })
  });
};

exports.loginUser = async (req, res) => {};
