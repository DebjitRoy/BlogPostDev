import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import TravelLanding from "./components/layout/TravelLanding";
import BooksLanding from "./components/layout/BooksLanding";
import MisclLanding from "./components/layout/MisclLanding";
import TravelPost from "./components/layout/TravelPost";
import PostForm from "./components/layout/PostForm";
import CreatePostForm from "./admin/CreatePost";
import LoginPage from "./admin/Login";
import AdminNavbar from "./admin/AdminNavbar";
import AdminDashboard from "./admin/Dashboard";
import TravelPostEdit from "./admin/TravelPostEdit";

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route path="/admin" component={AdminNavbar} />
        <Route path="/" component={Navbar} />
      </Switch>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/travel" component={TravelLanding} />
        <Route exact path="/travel/:id" component={TravelPost} />

        <Route exact path="/books" component={BooksLanding} />
        <Route exact path="/miscl" component={MisclLanding} />
        {/* <Route exact path="/books/:id" component={TravelPost} /> */}

        <Route exact path="/upload" component={PostForm} />

        <Route exact path="/admin" component={LoginPage} />
        <Route exact path="/admin/createpost" component={CreatePostForm} />
        <Route exact path="/admin/login" component={LoginPage} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/postedit/:id" component={TravelPostEdit} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
