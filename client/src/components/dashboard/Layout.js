import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects } from "../../actions/projectsActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Tasks from "./MainContent/Tasks";
import Project from "./MainContent/Project/Project";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects, projectsLoading } = this.props.projects;

    let dashboardContent;

    if (projects === null || projectsLoading) {
      dashboardContent = <Spinner />;
    } else if (projects.length > 0) {
      dashboardContent = (
        <>
          <SideNav projects={projects} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                projects={projects}
                component={Dashboard}
              />
              <Route
                exact
                path="/tasks"
                projects={projects}
                component={Tasks}
              />
              <Route exact path="/projects/:project" component={Project} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                projects={[]}
                component={Dashboard}
              />
              <Route exact path="/tasks" component={Tasks} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});

export default withRouter(
  connect(
    mapStateToProps,
    { getProjects }
  )(Layout)
);
