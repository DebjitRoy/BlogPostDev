import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import TravelLanding from "./components/layout/TravelLanding";
import TravelPost from "./components/layout/TravelPost";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/travel" component={TravelLanding} />
        <Route exact path="/travel/:id" component={TravelPost} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
