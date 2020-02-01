import React from "react";
import "./landingPage.css";
import AuthorizationPage from "./authorization/authorization.js";
import RegistrationPage from "./registration/registration.js"
import CoursesPage from "./courses/coursesMainPage.js";
import MenuBar from "./menuBar.js";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
const MainPage = () => {
  return <Container style={{ paddingTop: "50px" }}>MainPage</Container>;
};
export default class LandingPage extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Container fluid>
            <MenuBar />
          </Container>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Authorization" component={AuthorizationPage} />
          <Route exact path="/Courses" component={CoursesPage} />
          <Route exact path="/Registration" component={RegistrationPage} />
        </div>
      </Router>
    );
  }
}
