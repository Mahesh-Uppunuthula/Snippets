const mongoose = require("mongoose");

const editorSchema = mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, require:true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    folder: { type: String, required: true },
    date:{type:Date, default: Date.now}
  },
);


const EditorModel = new mongoose.model("snippet", editorSchema);
module.exports = {editorSchema, EditorModel};
