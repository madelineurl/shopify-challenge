import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
        <div className="container">
          <Nav />
          <div className="navbar-header">
            The Shoppies
          </div>
        </div>
        </div>
      <hr/>
      <div className="container content">
          {children}
      </div>
      <hr/>
      <div id="footer" className="container text-muted footer">
        App by Madeline Higgins
      </div>
    </>
  );
};

export default Layout;
