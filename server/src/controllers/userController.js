const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");
const UserDirectory = require("../models/UserDirectory");
const auth = require("../middlware/auth");

exports.registerUser = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  UserModel.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      /*
       *express resource conflict
       */
      return res.json({ message: "user already exists", status: 409 });
    }

    // hashing passwords with bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      const newUser = new UserModel({ email, password: hashedPassword });
      newUser
        .save()
        .then(() => {
          const newUserDirectory = new UserDirectory.UserDirectoryModel({
            _id: newUser._id,
            userDir: [],
          });

          newUserDirectory.save();

          res.json({ message: "Registered Succuessfully!" });
        })
        .catch((err) => {
          res.send(err);
          console.error("Registration error", err);
        });
    });
  });
};

exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  
  console.log("login", email, password);
  UserModel.findOne({ email }).then((foundUser) => {
    // if foundUser is null
    if (!foundUser) {
      /*
       * send reponse as invalid credentials 401
       */
      return res.json({
        message: "Invalid Username",
        status: 401,
      });
    }

    bcrypt.compare(password, foundUser.password).then((isMatch) => {
      if (!isMatch) {
        /*
         * send reponse as invalid credentials 401
         */
        return res.json({
          message: "Username or Password incorrect",
          status: 401,
        });
      }

      const token = jwt.sign(
        { id: foundUser._id, email: email },
        JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      console.log("login token ", token);
      // res.json({ token, UserID: afoundUser._id});
      res.json({ token });
    });
  });
};

exports.verifiedUser = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.json({ isVerified: false });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, verifiedToken) => {
    if (err) res.json({ isVerified: false });
    UserModel.findOne({ _id: verifiedToken.id })
      .then((reponse) => {
        if (!reponse) res.json({ isVerified: false });
        res.json({ isVerified: true, email: verifiedToken.email });
      })
      .catch((err) => {
        res.json({ message: err });
      });
  });
};

exports.justHomeRoute = async (req, res) =>{
  res.send("this is home page and its running")
}
