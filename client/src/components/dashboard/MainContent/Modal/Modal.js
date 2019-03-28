import React, { Component } from "react";
import "./Modal.scss";
import { connect } from "react-redux";
import {
  createProject,
  updateProject
} from "../../../../actions/projectsActions";

/*
Credit for dynamic form component:
https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
*/

/*
TODO Add form validation for required fields, maximum lengths and email format
*/

class Modal extends Component {
  state = {
    projectName: "",
    members: [{ name: "", email: "" }]
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

  updateProject = id => {
    let project = {
      id: this.props.id,
      projectName: this.state.projectName,
      members: this.state.members
    };

    this.props.updateProject(project);
    this.onClose();
  };

  deleteProject = id => {
    alert(`TODO: DELETE ${id}`);
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({ projectName: "", members: [{ name: "", email: "" }] });
  };

  render() {
    if (!this.props.modal) {
      return null;
    }

    let { members } = this.state;

    if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Project Info</h1>
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
          <div className="members">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (optional)
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
            <button
              className="main-btn delete-project"
              onClick={this.deleteProject.bind(this, this.props.id)}
            >
              Delete Project
            </button>
          </div>
        </div>
      );
    }

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
                  Name (optional)
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
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { createProject, updateProject }
)(Modal);
