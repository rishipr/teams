const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../../models/Task");

// @route GET api/tasks/:id
// @desc Get tasks for specific project
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Task.find({ project: id }).then(tasks => res.json(tasks));
  }
);

// @route POST api/tasks/create
// @desc Create a new task
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const NEW_TASK = new Task({
      project: req.body.project,
      taskName: req.body.taskName,
      dateDue: req.body.dateDue,
      assignee: req.body.assignee
    });

    NEW_TASK.save()
      .then(task => res.json(task))
      .catch(err => console.log(err));
  }
);

// @route POST api/tasks/delete
// @desc Delete an existing task
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findById(req.params.id).then(task => {
      task.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PATCH api/tasks/update
// @desc Update an existing task
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let taskFields = {};

    taskFields.taskName = req.body.taskName;
    if (req.body.dateDue && req.body.dateDue !== "Date undefined") {
      taskFields.dateDue = req.body.dateDue;
    }
    taskFields.assignee = req.body.assignee;

    Task.findOneAndUpdate(
      { _id: req.body.id },
      { $set: taskFields },
      { new: true }
    )
      .then(task => {
        res.json(task);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
