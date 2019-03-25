const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../../models/Project");

// @route GET api/projects
// @desc Get all projects for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.find({ ownerId: req.user.id })
      .then(projects => res.json(projects))
      .catch(err => console.log(err));
  }
);

// @route POST api/projects/create
// @desc Create a new project
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProject = new Project({
      ownerId: req.user.id,
      name: req.body.projectName,
      teamMembers: req.body.members
    });

    newProject.save().then(project => res.json(project));
  }
);

// @route POST api/projects/delete
// @desc Delete an existing project
// @access Private

module.exports = router;
