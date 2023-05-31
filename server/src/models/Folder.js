const mongoose = require("mongoose");

const folderSchema = mongoose.Schema({
  // userId:String,
  
  userId:{type:mongoose.Schema.Types.ObjectId, required :true},
  name: { type: String, required : true, unique:true},
  date:{type:Date, default: Date.now}
});

const FolderModel = new mongoose.model("folder", folderSchema);

module.exports = { folderSchema, FolderModel };
