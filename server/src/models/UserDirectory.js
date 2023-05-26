const mongoose = require("mongoose");
const Folder = require("./Folder");

const userDirectorySchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  userDir: { type: [Folder.folderSchema] },
});

const UserDirectoryModel = new mongoose.model("directory", userDirectorySchema);

module.exports = { userDirectorySchema, UserDirectoryModel };
