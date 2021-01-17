import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <h1>
        The Shoppies
      </h1>
      <div className="container main">
          {children}
      </div>
      {/* <div className="footer">
        App by Madeline Higgins
      </div> */}
    </>
  );
};

export default Layout;
