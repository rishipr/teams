const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  teamMembers: [
    {
      email: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
