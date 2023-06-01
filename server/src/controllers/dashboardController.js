const _ = require("lodash");
const Folder = require("../models/Folder");
const Snippet = require("../models/Snippet");

exports.getAllFolders = async (req, res) => {
  const userId = req.user.id;
  Folder.FolderModel.find({ userId })
    .then((foundFolders) => {
      res.json({ folders: foundFolders });
    })
    .catch((err) => {
      console.log("get all folders err", err);
      res.json({ message: "something went wrong while fetching your folders" });
    });
};

exports.createFolder = async (req, res) => {
  const userId = req.user.id;
  let { folderName } = req.body;
  folderName = _.capitalize(folderName);
  const newFolder = new Folder.FolderModel({
    userId: userId,
    name: folderName,
  });

  newFolder
    .save()
    .then((response) => {
      res.json({ message: "successfully created new folder" });
    })
    .catch((err) => {
      console.log("create new folder err", err);
      res.json({ message: "something went wrong while create new folder" });
    });
};

exports.getAllSnippetsOfAFolder = async (req, res) => {
  const userId = req.user.id;
  console.log("user id in getAllSnippetsOfAFolder ", userId);

  const { folderId } = req.params;
  console.log("folderId in GetAllSnippetsOfAFolder", folderId);

  Snippet.SnippetModel.find({ userId, folderId })
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

exports.deleteFolder = async (req, res) => {
  const userId = req.user.id;
  console.log("user id in delete folder", userId);
  const { folderId } = req.params;

  Folder.FolderModel.findOneAndDelete({ _id: folderId, userId : userId})
    .then((response) => {
      console.log("response after deleting folder",response);
      res.json({ message: "successfully deleted folder" });
    })
    .catch((err) => {
      console.log("delete folder err", err);
      res.json({
        message: "something went wrong while deleting a folder",
      });
    });
};