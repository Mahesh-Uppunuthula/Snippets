const Folder = require("../models/Folder");

exports.getFavFolder = async(req, res)=>{
    const userId = req.user.id;
    Folder.FolderModel.find({userId, favorite:"true"})
      .then((response)=>{
        console.log("response on fav: ", response);
        res.json({response});
      })
      .catch((err)=>{
        console.log("err on fav : ", err);
      })
  }