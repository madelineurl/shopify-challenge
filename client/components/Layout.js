import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">The Shoppies</a>
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
