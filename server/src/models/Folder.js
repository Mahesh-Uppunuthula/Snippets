const mongoose = require("mongoose");
const Snippet = require("./Snippet");

// const editorSchema = Editor.editorSchema;

const folderSchema = mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  userId:String,
  name: { type: String, required : true, unique:true},
});

const FolderModel = new mongoose.model("folder", folderSchema);

module.exports = { folderSchema, FolderModel };
