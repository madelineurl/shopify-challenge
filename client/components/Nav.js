import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <ul>
      <Link to="/"><li>Search Movies</li></Link>
      <Link to="/nominations"><li>My Nominations</li></Link>
    </ul>
  );
};

export default Nav;
