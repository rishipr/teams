import React from "react";
import { Link } from "react-router-dom";

import "./404.scss";

const NotFound = props => {
  return (
    <div className="not-found">
      <Link to="/dashboard">
        <b>404</b>
      </Link>
      <br />
      <p>The requested page was not found on our server.</p>
      <p>
        Either you the url you typed in is incorrect, you do not have access
        privileges to the page, or the page you are looking for has been
        removed.
      </p>
    </div>
  );
};

export default NotFound;
