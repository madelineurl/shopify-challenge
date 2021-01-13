import React from "react";
import Search from "./Search";
import Layout from "./Layout";
import Nominations from "./Nominations";

const Homepage = () => {
  return (
    <Layout>
      <Search />
      <Nominations />
    </Layout>
  );
};

export default Homepage;
