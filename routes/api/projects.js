const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../../models/Project");

// @route GET api/projects
// @desc Get all projects for a specific user
// @access Private
// TODO Get all projects where user is member and where user is owner
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let projectsArr = [];

    // Member projects
    await Project.find({}).then(projects => {
      projects.map(project => {
        project.teamMembers.map(member => {
          if (member.email == req.user.email) {
            projectsArr.push(project);
          }
        });
      });
    });

    const owner = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner projects
    await Project.find({ owner: owner })
      .then(projects => {
        let finalArr = [...projects, ...projectsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route POST api/projects/create
// @desc Create a new project
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const owner = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const newProject = await new Project({
      owner: owner,
      name: req.body.projectName,
      teamMembers: req.body.members
    });

    newProject.save().then(project => res.json(project));
  }
);

// @route PATCH api/projects/update
// @desc Update an existing project
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let projectFields = {};

    projectFields.name = req.body.projectName;
    projectFields.teamMembers = req.body.members;

    Project.findOneAndUpdate(
      { _id: req.body.id },
      { $set: projectFields },
      { new: true }
    )
      .then(project => {
        res.json(project);
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/projects/delete
// @desc Delete an existing project
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.params.id).then(project => {
      project.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
