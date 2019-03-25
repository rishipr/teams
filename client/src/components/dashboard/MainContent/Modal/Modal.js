import React, { Component } from "react";
import "./Modal.scss";
import { connect } from "react-redux";
import { createProject } from "../../../../actions/projectsActions";

/*
Credit for dynamic form component:
https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
*/

class Modal extends Component {
  state = {
    projectName: "",
    members: [{ name: "", email: "" }]
  };

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

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({ projectName: "", members: [{ name: "", email: "" }] });
  };

  createProject = () => {
    let project = {
      projectName: this.state.projectName,
      members: this.state.members
    };

    this.props.createProject(project);
    this.onClose();
  };

  render() {
    if (!this.props.modal) {
      return null;
    }

    let { members } = this.state;

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
  { createProject }
)(Modal);
