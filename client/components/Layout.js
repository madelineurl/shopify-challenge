import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container" role="navigation">
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
