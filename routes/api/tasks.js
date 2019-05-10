const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../../models/Task");

// @route GET api/projects
// @desc Get all projects for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findAll()
      .then(tasks => {
        res.json(tasks);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
