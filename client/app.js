import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Nominations from "./components/Nominations";

const App = () => {
  useEffect(() => {
    localStorage.removeItem('searchData');
  }, []);

  return (
    <Router>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/nominations' component={Nominations} />
    </Router>
  );
};

export default App;
