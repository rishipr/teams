import React from "react";

import "./404.scss";

const NotFound = props => {
  return (
    <div className="not-found">
      <span>
        <b>404</b>
      </span>
      <br />
      <span>The requested page was not found on our server.</span>
    </div>
  );
};

export default NotFound;
