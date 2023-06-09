const mongoose = require("mongoose");

const snippetSchema = mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, required :true},
    folderId:{type:mongoose.Schema.Types.ObjectId, required :true},
    title: { type: String, required: true, trim:true },
    content: { type: String, required: true },
    folderName: { type: String, required: true, trim:true},
    date:{type:Date, default: Date.now}
  },
);


const SnippetModel = new mongoose.model("snippet", snippetSchema);
module.exports = {snippetSchema, SnippetModel};
