import React from "react";
import "./landingPage.css";
import AutorisationPage from "./autorisation/autorisation.js";
import CoursesPage from "./courses/coursesMainPage.js";
import MenuBar from "./menuBar.js";
import { Container, Card } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
const MainPage = () => {
  return <Container style={{ paddingTop: "100px" }}>MainPage</Container>;
};
export default class LandigPage extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Container fluid>
            <MenuBar />
          </Container>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/Autorisation" component={AutorisationPage} />
          <Route exact path="/Courses" component={CoursesPage} />
        </div>
      </Router>
    );
  }
}
