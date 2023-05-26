const UserDirectory = require("../models/UserDirectory");
const Folder = require("../models/Folder");
const Editor = require("../models/Editor");

exports.saveSnippet = async (req, res) => {
  const { userId, title, content, language, folder } = req.body;
  const newSnippet = new Editor.EditorModel({
    userId,
    title,
    content,
    language,
    folder,
  });

  //   FIND THE USER SPECIFIC DIRECTORY

  const UserDirectoryModel = UserDirectory.UserDirectoryModel;
  const FolderModel = Folder.FolderModel;

  UserDirectoryModel.findOne({ _id: userId }).then((foundDir) => {
    // assuming user id is never null

    // create a snippet
    const newSnippet = new Editor.EditorModel({
      userId,
      title,
      content,
      language,
      folder,
    });

    // console.log("USER DIR ", foundDir.userDir[0].name);

    const folderList = foundDir.userDir;

    let foundFolderIdx = -1;

    for (let i = 0; i < folderList.length; i++) {
      if (folderList[i].name === folder) {
        foundFolderIdx = i;
      }
    }

    console.log("index", foundFolderIdx);

    if (foundFolderIdx === -1) {
      const newFolder = new FolderModel({
        name: folder,
        snippets: [],
      });
      newFolder.snippets.push(newSnippet);
      console.log("New post push", newFolder);

      foundDir.userDir.push(newFolder);
      console.log(foundDir.userDir);
    } else {
        const foundFolder = folderList[foundFolderIdx];
        foundFolder.snippets.push(newSnippet);
        console.log("found folder post push", foundFolder);
        
        // foundDir.userDir.push(foundFolder);
        console.log(foundDir.userDir);
    }

    // FolderModel.findOne({ name: folder })
    //   .then((foundList) => {
    //     if (!foundList) {
    //       const newFolder = new FolderModel({
    //         name: folder,
    //         snippets: [newSnippet],
    //       });

    //       console.log("new folder",newFolder);
    //     //   newFolder.snippets.push(newSnippet);
    //       //   newFolder.save();
    //       foundDir.userDir.push(newFolder);
    //       console.log("found Dir post NEW push ", foundDir);
    //     } else {
    //       foundList.snippets.push(newSnippet);
    //       console.log("found list after push ", foundList);
    //       //   foundList.save();
    //       foundDir.userDir.push(foundList);
    //       console.log("found Dir post push ", foundDir);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    foundDir
      .save()
      .then(() => {
        res.json({ message: "Snippet saved -> Folder -> Dir" });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //   res.json({ status: 200, message: "saved" });
};
