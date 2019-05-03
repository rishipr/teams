const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects"
  },
  taskName: {
    type: String,
    required: true
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
