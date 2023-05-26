const UserDirectory = require("../models/UserDirectory");

exports.getUserDirectory = async(req, res)=>{
    const {userId} = req.body;

    console.log("user id passed from dashboard", userId);
    const UserDirectoryModel = UserDirectory.UserDirectoryModel;

    UserDirectoryModel.findOne({_id:userId})
        .then((foundDir)=>{
            res.json({userDir:foundDir.userDir})
        })
        .catch((err)=>{
            console.log(err);
        })
    
}