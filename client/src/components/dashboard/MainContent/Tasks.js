import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Tasks extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { projects } = this.props.projects;

    return (
      <div className="main-content">
        <h1 className="header">Your Tasks</h1>
        <div className="projects">
          <div className="no-projects">
            <h1 className="header">You have no tasks</h1>
            {projects.length > 0 ? (
              <p>Visit a project to create your first task</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first project
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});

export default connect(
  mapStateToProps,
  {}
)(Tasks);
