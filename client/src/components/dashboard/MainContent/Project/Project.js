import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../../../actions/projectsActions";
import moment from "moment";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Project.scss";

const tasks = [
  {
    task: "Finish initial spec documentation",
    due: "04/05/2019",
    assignee: "Nikhil"
  },
  {
    task: "Send email to all advisors",
    due: "04/02/2019",
    assignee: "Johnson with a long name"
  },
  {
    task: "Finalize sponsorship plan",
    due: "05/10/2019",
    assignee: "Rishi"
  }
];

class Project extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {},
    tasks: []
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  componentDidMount() {
    this.props.getProject(this.props.match.params.project);
    this.setState({ tasks: tasks });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.project !== prevProps.match.params.project) {
      this.props.getProject(this.props.match.params.project);
    }
  }

  onChange = e => {
    let tasks = [...this.state.tasks];
    tasks[e.target.id][e.target.name] = e.target.value;
    this.setState({ tasks });
  };

  render() {
    let tasksList = tasks.map((task, index) => (
      <div className="task-input" key={index}>
        <i className="material-icons" onClick={() => alert("TODO")}>
          check_circle
        </i>
        <input
          type="text"
          name="task"
          id={index}
          value={task.task || tasks[index].task}
          onChange={this.onChange}
          className="project-task"
        />
        <span className="task-info">{task.assignee}</span>
        <span className="task-info">
          {(() => {
            let date = moment(task.due, "MM-DD-YYYY")
              ._d.toString()
              .split(" ");
            return date[1] + " " + date[2];
          })()}
        </span>
      </div>
    ));

    if (
      this.props.project &&
      this.props.project.teamMembers &&
      !this.props.projects.projectLoading
    ) {
      const { project } = this.props;

      return (
        <div className="main-content">
          <h1 className="project-header">{project.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              project.name,
              project.teamMembers,
              project._id,
              project.owner
            )}
            className="main-btn center-btn"
          >
            Edit Project Info
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="tasks-container">
            <div className="projects-first-row">
              <button
                className="main-btn add-btn"
                onClick={() => alert("TODO")}
              >
                Add task
              </button>
              <div className="projects-column-headers">
                <p>Assignee</p>
                <p>Due</p>
              </div>
            </div>
            <div className="project-tasks">{tasksList}</div>
          </div>
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
