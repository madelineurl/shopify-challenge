import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container" role="navigation">
        <Nav />
        <h1 className="navbar-header">
          The Shoppies
        </h1>
      </div>
      <div className="container">
          {children}
      </div>
      <div className="footer">
        App by Madeline Higgins
      </div>
    </>
  );
};

export default Layout;
