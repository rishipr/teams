import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Tasks from "./MainContent/Tasks";

import "./Layout.scss";

class Layout extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Router>
        <div className="wrapper">
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/tasks" component={Tasks} />
              <Route component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(Layout)
);
