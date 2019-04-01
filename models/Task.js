const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects"
  },
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  dateDue: {
    type: Date
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
