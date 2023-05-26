const mongoose = require("mongoose");
const Editor = require("./Editor");

const editorSchema = Editor.editorSchema;

const folderSchema =  mongoose.Schema(
    {
    name:{type:String},
    snippets:[editorSchema]
});

const FolderModel = new mongoose.model("folder", folderSchema);

module.exports = {folderSchema, FolderModel};