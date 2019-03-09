import React, { Component } from "react";
import "./MainContent.scss";

class Dashboard extends Component {
  toggleModal = () => {
    alert("Modal to be constructed");
  };

  render() {
    return (
      <div className="main-content">
        <h1 className="header">Your Projects</h1>
        <div className="projects">
          <div className="no-projects">
            <h1 className="header">You have no projects</h1>
            <button className="main-btn" onClick={this.toggleModal}>
              Create your first project
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
