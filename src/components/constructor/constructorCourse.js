import React from "react";
import "./constructorCourse.css";
import { Container, Button } from "react-bootstrap";

export default class ConstructorCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }
  updateStorage = () => {
    let course = {
      name: "testName",
      description: "testDescr",
      block: []
    };
    
    localStorage.setItem("course", JSON.stringify(course));
    let storageObj = JSON.parse(localStorage.getItem("course"));

    storageObj.name = this.state.name;
    storageObj.description = this.state.description;

    localStorage.setItem("course", JSON.stringify(storageObj));
  };
  render() {
    return (
      <Container className="constructor-wrapper">
        <p className="constructor-font">Add course name:</p>
        <input
          className="constructor-input"
          onChange={v => {
            let value = v.target.value;

            this.setState({ name: value });
          }}
        ></input>
        <p className="constructor-font">Add course description:</p>
        <textarea
          className="constructor-text-area"
          onChange={v => {
            let value = v.target.value;
            this.setState({ description: value });
          }}
        ></textarea>
        <br />
        <Button
          className="myButton"
          onClick={() => {
            this.updateStorage();
            window.location = "/Constructor/Block";
          }}
        >
          Add the blocks
        </Button>
      </Container>
    );
  }
}
