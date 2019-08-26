import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Link, withRouter } from "react-router-dom";

import "./TopNav.scss";

class TopNav extends Component {
  state = {
    dropdown: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  // Close dropdown when click outside
  handleClick = e => {
    if (this.state.dropdown && !this.node.contains(e.target)) {
      this.setState({ dropdown: !this.state.dropdown });
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };

  handleProfileClick = e => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  // Show Side Nav
  toggleMenu = e => {
    let sideNav = document.querySelector(".side");
    sideNav.classList.remove("invisibile");

    let hamburger = document.querySelector(".hamburger-top-menu");
    hamburger.classList.remove("hamburger-visible");

    let rightSide = document.querySelector(".right");
    rightSide.classList.remove("no-side");

    let rightSideRight = document.querySelector(".right-top");
    rightSideRight.classList.remove("right-top-visibile");
  };

  render() {
    const { name, email } = this.props.auth.user;

    return (
      <nav className="top-nav" ref={node => (this.node = node)}>
        <div className="left-top">
          <i
            onClick={this.toggleMenu}
            className="material-icons hamburger-top-menu"
          >
            menu
          </i>
          <Link to="/dashboard">
            <h1 className="brand-header">
              Team<span className="brand-header-sub">s</span>
            </h1>
          </Link>
        </div>
        <ul className="right-top">
          <li>
            <div className="email">
              <p>Signed in as {email}</p>
            </div>
          </li>
          <li>
            <div className="profile" onClick={this.handleProfileClick}>
              <span>{name !== undefined && name.split("")[0]}</span>
            </div>
            {this.state.dropdown ? (
              <ul className="dropdown">
                <p>Hello, {name !== undefined && name.split(" ")[0]}</p>
                <Link to="/dashboard">
                  <li>Home</li>
                </Link>
                {/*
                <Link to="/tasks">
                  <li>My Tasks</li>
                </Link>
                */}
                <li onClick={this.onLogoutClick}>Sign Out</li>
              </ul>
            ) : null}
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(TopNav));
