import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Nominations from "./components/Nominations";
import Nav from "./components/Nav";

const App = () => {
  useEffect(() => {
    localStorage.removeItem('searchData');
  }, []);

  return (
    <Router>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/nominations' component={Nominations} />
      <Route component={Nav} />
    </Router>
  );
};

export default App;
