import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Choices from "./components/choices/Choices";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Choices} />
      </Router>
    );
  }
}
export default App;
