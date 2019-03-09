const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../../models/Project");

// @route POST api/projects/create
// @desc Create a new project
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findOne({ name: req.body.name }).then(project => {
      if (project) {
        return res
          .status(400)
          .json({ name: "Project with identical name already exists" });
      } else {
        const newProject = new Project({
          name: req.body.name,
          ownerId: req.body.ownerId,
          teamMembers: req.body.teamMembers
        });

        newProject
          .save()
          .then(project => res.json(project))
          .catch(err => console.log(err));
      }
    });
  }
);

// @route POST api/projects/delete
// @desc Delete an existing project
// @access Private

module.exports = router;
