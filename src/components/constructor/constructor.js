import React from "react";
import "./constructor.css";
import { Container, Button } from "react-bootstrap";

export default class Constructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      courseDescription: "",
      amountLessons: ""
    };
  }
  render() {
    return (
      <Container className="constructor-wrapper">
        <p className="constructor-font">Add course name:</p>
        <input className="constructor-input"></input>
        <p className="constructor-font">Add course description:</p>
        <textarea className="constructor-text-area"></textarea>
        <p className="constructor-font">Enter amount of lessons::</p>
        <input className="constructor-input-amount"></input>
        <br />
        <Button className="myButton">Add the lesson</Button>
      </Container>
    );
  }
}
