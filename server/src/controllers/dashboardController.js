const Folder = require("../models/Folder");
const Snippet = require("../models/Snippet");

exports.getAllFolders = async(req, res)=>{
    const userId = req.user.id;
    Folder.FolderModel.find({userId})
        .then((foundFolders)=>{
            res.json({folders:foundFolders});
        })
        .catch((err)=>{
            console.log("get all folders err",err);
            res.json({message:"something went wrong while fetching your folders"});
        })
}

exports.createFolder = async(req, res)=>{
    const userId = req.user.id;
    const {folderName} = req.body;

    const newFolder = new Folder.FolderModel({
        userId:userId,
        name:folderName
    });

    newFolder
        .save()
        .then((response)=>{
            res.json({message:"successfully created new folder"});
        })
        .catch((err)=>{
            console.log("create new folder err",err);
            res.json({message:"something went wrong while create new folder"});
        })
}

exports.getAllSnippetsOfAFolder = async (req, res) => {
    const userId = req.user.id;
    console.log("user id in getAllSnippetsOfAFolder ", userId);
  
    const { folderId } = req.params;
    console.log("folderId in GetAllSnippetsOfAFolder",folderId);
    
    Snippet.SnippetModel.find({userId ,folderId })
      .then((foundSnippets) => {
        res.json({ snippets: foundSnippets });
      }) 
      .catch((err) => {
        console.log("get all Snippets Of A Folder err", err);
        res.json({
          message: "something went wrong while fetching all snippets of a folder",
        });
      });
  };


// const UserDirectory = require("../models/UserDirectory");

// exports.getUserDirectory = async(req, res)=>{
//     const {userId} = req.body;

//     console.log("user id passed from dashboard", userId);
//     const UserDirectoryModel = UserDirectory.UserDirectoryModel;

//     UserDirectoryModel.findOne({_id:userId})
//         .then((foundDir)=>{
//             res.json({userDir:foundDir.userDir})
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
    
// }