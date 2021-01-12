import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

const App = () => {
  useEffect(() => {
    localStorage.removeItem('searchData');
  }, []);

  return (
    <Router>
      <Route exact path='/' component={Homepage} />
    </Router>
  );
};

export default App;
