import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createProject,
  updateProject,
  deleteProject
} from "../../../../actions/projectsActions";
import { createTask } from "../../../../actions/taskActions";

import moment from "moment";

import "./Modal.scss";

class Modal extends Component {
  state = {
    projectName: "",
    members: [{ name: "", email: "" }],
    taskName: "",
    assignee: "",
    monthDue: "",
    dayDue: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        projectName: nextProps.name,
        members: nextProps.members
      });
    }
  }

  onChange = e => {
    if (["name", "email"].includes(e.target.name)) {
      let members = [...this.state.members];
      members[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ members });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  addMember = e => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: "", email: "" }]
    }));
  };

  deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array });
  };

  createProject = () => {
    let project = {
      projectName: this.state.projectName,
      members: this.state.members
    };

    this.props.createProject(project);
    this.onClose();
  };

  updateProject = async id => {
    let project = {
      id: this.props.id,
      projectName: this.state.projectName,
      members: this.state.members
    };

    await this.props.updateProject(project);

    this.onClose();
  };

  deleteProject = id => {
    this.props.deleteProject(id);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      projectName: "",
      taskName: "",
      assignee: "",
      monthDue: "",
      dayDue: "",
      members: [{ name: "", email: "" }]
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  createTask = e => {
    e.preventDefault();

    let fullDate =
      this.state.monthDue +
      "-" +
      this.state.dayDue +
      "-" +
      Date().split(" ")[3];

    let momentDate = moment(fullDate, "MM-DD-YYYY")
      ._d.toString()
      .split(" ");

    let finalDate = momentDate[1] + " " + momentDate[2];

    const data = {
      project: this.props.projects.project._id,
      taskName: this.state.taskName,
      assignee: this.state.assignee,
      dateDue: finalDate
    };

    this.props.createTask(data);

    this.onClose();
  };

  render() {
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    let { members } = this.state;

    // Create task modal
    if (this.props.task) {
      const { teamMembers } = this.props.projects.project;
      const { name, email } = this.props.auth.user;

      // Assignee dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => (
        <option key={index} value={member.email}>
          {member.name}
        </option>
      ));

      // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form onSubmit={this.createTask} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Assignee</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.assignee}
                  id="assignee"
                  type="text"
                  className="form-input task-input-split"
                >
                  <option disabled value="">
                    Select a teammate
                  </option>
                  <option value={email}>{name + " (You)"}</option>
                  {membersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Due Date</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.monthDue}
                    id="monthDue"
                    type="text"
                    className="form-input task-input-split month-due"
                  >
                    <option disabled value="">
                      Month
                    </option>
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.dayDue}
                    id="dayDue"
                    type="text"
                    className="form-input task-input-split"
                  >
                    <option disabled value="">
                      Day
                    </option>
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button className="main-btn update-project" type="submit">
              Create Task
            </button>
          </div>
        </form>
      );
    } else if (this.props.editTask) {
      const { teamMembers } = this.props.projects.project;
      const { name, email } = this.props.auth.user;

      // Assignee dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => (
        <option key={index} value={member.email}>
          {member.name}
        </option>
      ));

      // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form onSubmit={this.createTask} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Assignee</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.assignee}
                  id="assignee"
                  type="text"
                  className="form-input task-input-split"
                >
                  <option disabled value="">
                    Select a teammate
                  </option>
                  <option value={email}>{name + " (You)"}</option>
                  {membersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Due Date</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.monthDue}
                    id="monthDue"
                    type="text"
                    className="form-input task-input-split month-due"
                  >
                    <option disabled value="">
                      Month
                    </option>
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.dayDue}
                    id="dayDue"
                    type="text"
                    className="form-input task-input-split"
                  >
                    <option disabled value="">
                      Day
                    </option>
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button className="main-btn update-project" type="submit">
              Create Task
            </button>
          </div>
        </form>
      );
    }

    // Edit project modal
    else if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Project Info</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">Project Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.projectName}
                id="projectName"
                type="text"
                placeholder={"My Awesome Project"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members-edit">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    REMOVE
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn update-project"
              onClick={this.updateProject.bind(this, this.props.id)}
            >
              Update Project
            </button>
            {this.props.owner.id === this.props.auth.user.id ? (
              <button
                className="main-btn delete-project"
                onClick={this.deleteProject.bind(this, this.props.id)}
              >
                Delete Project
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // Create project modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create a project</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Project Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.projectName}
                id="projectName"
                type="text"
                placeholder="My Awesome Project"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    REMOVE
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn create-project"
              onClick={this.createProject}
            >
              Create Project
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects,
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  { createProject, updateProject, deleteProject, createTask }
)(Modal);
