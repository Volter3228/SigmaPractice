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
  createStorage = () => {
    let course = {
      courseId: 0,
      courseName: "",
      courseDescription: "",
      courseBlocks: []
    };
    let block = {
      blockId: -1,
      blockName: "",
      blockLessons: []
    };
    let lesson = {
      lessonId: -1,
      lessonName: "",
      lessonContent: ""
    };
    let content = "";

    localStorage.setItem("course", JSON.stringify(course));
    localStorage.setItem("block", JSON.stringify(block));
    localStorage.setItem("lesson", JSON.stringify(lesson));
    localStorage.setItem("content", JSON.stringify(content));
    let storageCourse = JSON.parse(localStorage.getItem("course"));
    storageCourse.courseName = this.state.name;
    storageCourse.courseDescription = this.state.description;
    if (storageCourse.courseName === "") {
      alert("Add course name");
      return 0;
    }

    localStorage.setItem("course", JSON.stringify(storageCourse));
    return 1;
  };

  componentDidMount() {}

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
            if (this.createStorage()) {
              window.location = "/Constructor/Block";
            }
          }}
        >
          Add the blocks
        </Button>
        <Button
          className="myButton"
          onClick={() => {
            localStorage.removeItem("block");
          }}
        >
          Clear localStorage
        </Button>
      </Container>
    );
  }
}
