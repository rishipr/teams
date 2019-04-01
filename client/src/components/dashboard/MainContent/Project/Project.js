import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../../../actions/projectsActions";

import Spinner from "../../../common/Spinner";

import "../MainContent.scss";
import "./Project.scss";

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.project);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.project !== prevProps.match.params.project) {
      this.props.getProject(this.props.match.params.project);
    }
  }

  render() {
    if (this.props.project !== null && !this.props.projects.projectLoading) {
      return (
        <div className="main-content">
          <h1 className="project-header">{this.props.project.name} View</h1>
          <p className="project-subheader">
            Project ID: {this.props.match.params.project}
          </p>
        </div>
      );
    }
    return (
      <div className="project-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.projects.project,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { getProject }
)(Project);
