const jwt = require("jsonwebtoken");
const { loginUser } = require("../controllers/userController");
const { response } = require("express");

const auth = (req, res, next)=>{
    const token = req.header("Authorization");
    // console.log("token auth",token);

    if(!token) {return res.status(401).json({message:"not authorised"})};

    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) return res.status(401).json({message:"invali token"});
        console.log("decoded auth", decoded);
        req.user = decoded;
        next();
      });
}

module.exports = auth;