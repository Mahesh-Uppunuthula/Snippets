// const UserDirectory = require("../models/UserDirectory");
const Folder = require("../models/Folder");
const Snippet = require("../models/Snippet");

exports.getAllSnippets = async (req, res) => {
  const { folderId } = req.body;
  Snippet.SnippetModel.find({ folderId })
    .then((foundSnippets) => {
      res.json({ snippets: foundSnippets });
    })
    .catch((err) => {
      console.log("get all snippets err", err);
      res.json({
        message: "something went wrong while fetching all snippets of a folder",
      });
    });
};

exports.getSnippet = async (req, res) => {
  const { folderId, snippetId } = req.params;
  Snippet.SnippetModel.findOne({ folderId: folderId, _id: snippetId })
    .then((foundSnippet) => {
      res.json({ snippet: foundSnippet });
    })
    .catch((err) => {
      console.log("getSnippet err", err.message);
      res.json({ message: "Something went while fetching your snippet" });
    });
};

exports.saveSnippet = async (req, res) => {
  const { userId, title, content, language, folderName } = req.body;
  console.log("req body", req.body);

  /** assumptions THERS EXISTS A FOLDER ALREADY BEFORE ADDING A SNIPPET & FOLDER NAMES ARE UNIQUE
   * 1. find the folder _id.
   * 2. create a new snippet and add it to the snippets folder
   */

  // finding the folder _id
  Folder.FolderModel.findOne({ userId: userId, name: folderName })
    .then((foundFolder) => {
      console.log("found folder", foundFolder);
      const foundFolderId = foundFolder._id.toString();

      // creating new snippet with given speicifications
      const newSnippet = new Snippet.SnippetModel({
        userId: userId,
        folderId: foundFolderId,
        title: title,
        content: content,
        language: language,
        folderName: folderName,
      });

      newSnippet
        .save()
        .then(() => {
          res.json({ message: "Your snippet saved" });
        })
        .catch((err) => {
          res.json({ message: err.message });
        });
    })
    .catch((err) => {
      console.log("folder search err", err);
      res.json({
        message: "Something went wrong while fetching folder details",
      });
    });
};

exports.editSnippet = async (req, res) => {
  /**
   * ASSUMPTIONS- user is allowed to update only the content and file name (a.k.a title) nothing less nothing more
   *
   */

  const { folderId, snippetId } = req.params;
  const { title, content } = req.body;
  Snippet.SnippetModel.findOneAndUpdate(
    // filter
    {
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
  const { folderId, snippetId } = req.params;

  Snippet.SnippetModel.findOneAndDelete({ folderId: folderId, _id: snippetId })
    .then((response) => {
      console.log("response from findOneAndDelete Method", response);
      res.json({ message: "snippet deleted successfully" });
    })
    .catch((err) => {
      console.log("delete snippet err", err);
      res.json({ message: "something went wrong while deleting your snippet" });
    });
};

// //   FIND THE USER SPECIFIC DIRECTORY

// const UserDirectoryModel = UserDirectory.UserDirectoryModel;
// const FolderModel = Folder.FolderModel;

// UserDirectoryModel.findOne({ _id: userId }).then((foundDir) => {
//   // assuming user id is never null

//   // create a snippet
//   const newSnippet = new Editor.EditorModel({
//     userId,
//     title,
//     content,
//     language,
//     folder,
//   });

//   // console.log("USER DIR ", foundDir.userDir[0].name);

//   const folderList = foundDir.userDir;

//   let foundFolderIdx = -1;

//   for (let i = 0; i < folderList.length; i++) {
//     if (folderList[i].name === folder) {
//       foundFolderIdx = i;
//     }
//   }

//   console.log("index", foundFolderIdx);

//   if (foundFolderIdx === -1) {
//     const newFolder = new FolderModel({
//       name: folder,
//       snippets: [],
//     });
//     newFolder.snippets.push(newSnippet);
//     console.log("New post push", newFolder);

//     foundDir.userDir.push(newFolder);
//     console.log(foundDir.userDir);
//   } else {
//       const foundFolder = folderList[foundFolderIdx];
//       foundFolder.snippets.push(newSnippet);
//       console.log("found folder post push", foundFolder);

//       // foundDir.userDir.push(foundFolder);
//       console.log(foundDir.userDir);
//   }

//   // FolderModel.findOne({ name: folder })
//   //   .then((foundList) => {
//   //     if (!foundList) {
//   //       const newFolder = new FolderModel({
//   //         name: folder,
//   //         snippets: [newSnippet],
//   //       });

//   //       console.log("new folder",newFolder);
//   //     //   newFolder.snippets.push(newSnippet);
//   //       //   newFolder.save();
//   //       foundDir.userDir.push(newFolder);
//   //       console.log("found Dir post NEW push ", foundDir);
//   //     } else {
//   //       foundList.snippets.push(newSnippet);
//   //       console.log("found list after push ", foundList);
//   //       //   foundList.save();
//   //       foundDir.userDir.push(foundList);
//   //       console.log("found Dir post push ", foundDir);
//   //     }
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });

//   foundDir
//     .save()
//     .then(() => {
//       res.json({ message: "Snippet saved -> Folder -> Dir" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //   res.json({ status: 200, message: "saved" });
