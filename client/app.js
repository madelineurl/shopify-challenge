import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Nominations from "./components/Nominations";

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/nominations' component={Nominations} />
    </Router>
  );
};

export default App;
