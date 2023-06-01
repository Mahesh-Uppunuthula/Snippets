const _ = require("lodash");
const Folder = require("../models/Folder");
const Snippet = require("../models/Snippet");

exports.getSnippet = async (req, res) => {
  const userId = req.user.id;
  const { folderId, snippetId } = req.params;

  Snippet.SnippetModel.findOne({
    userId: userId,
    folderId: folderId,
    _id: snippetId,
  })
    .then((foundSnippet) => {
      res.json({ snippet: foundSnippet });
    })
    .catch((err) => {
      console.log("getSnippet err", err.message);
      res.json({ message: "Something went while fetching your snippet" });
    });
};

exports.saveSnippet = async (req, res) => {
  const { title, content, folderId, folderName } = req.body;
  const userId = req.user.id;
  console.log("req body", req.body);

  // creating new snippet with given speicifications
  const newSnippet = new Snippet.SnippetModel({
    userId: userId,
    folderId: folderId,
    title: _.capitalize(title),
    content: content,
    folderName: _.capitalize(folderName),
  });

  newSnippet
    .save()
    .then(() => {
      res.json({ message: "Your snippet saved" });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });

};

exports.editSnippet = async (req, res) => {
  /**
   * ASSUMPTIONS- user is allowed to update only the content and file name (a.k.a title) nothing less nothing more
   *
   */

  const userId = req.user.id;
  const { folderId, snippetId } = req.params;
  const { title, content } = req.body;
  Snippet.SnippetModel.findOneAndUpdate(
    // filter
    {
      userId: userId,
      folderId: folderId,
      _id: snippetId,
    },
    // update
    {
      title: title,
      content: content,
    }
  )
    .then((reponse) => {
      // console.log("response from findOneAndUpdate Method", response);
      res.json({ message: "snippet updated " });
    })
    .catch((err) => {
      console.log("edit Snippet err", err);
      res.json({ message: "something went wrong while upating the snippet" });
    });
};

exports.deleteSnippet = async (req, res) => {
  const userId = req.user.id;
  const { folderId, snippetId } = req.params;

  Snippet.SnippetModel.findOneAndDelete({
    userId: userId,
    folderId: folderId,
    _id: snippetId,
  })
    .then((response) => {
      console.log("response from findOneAndDelete Method", response);
      res.json({ message: "snippet deleted successfully" });
    })
    .catch((err) => {
      console.log("delete snippet err", err);
      res.json({ message: "something went wrong while deleting your snippet" });
    });
};
