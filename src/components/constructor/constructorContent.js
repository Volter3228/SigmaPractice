import React from "react";
import "./constructorContent.css";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
function getCourse() {
  return JSON.parse(localStorage.getItem("course"));
}
function getBlock() {
  return JSON.parse(localStorage.getItem("block"));
}
function getLesson() {
  return JSON.parse(localStorage.getItem("lesson"));
}
function setLesson(obj) {
  localStorage.setItem("lesson", JSON.stringify(obj));
}
function setCourse(obj) {
  localStorage.setItem("course", JSON.stringify(obj));
}
function setBlock(obj) {
  localStorage.setItem("block", JSON.stringify(obj));
}

export default class ConstructorContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonName: "",
      lessonContent: ""
    };
  }
  changeLesson = () => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();

    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;
    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
  };
  render() {
    return (
      <Container>
        <Container className="constructorContent-wrapper">
          <p className="constructor-font">Add lesson name:</p>
          <input
            className="constructor-input"
            onChange={v => {
              let value = v.target.value;
              let storageLesson = getLesson();
              storageLesson.lessonName = value;
              setLesson(storageLesson);
            }}
            defaultValue={getLesson().lessonName}
          ></input>
          <p className="constructor-font">Add lesson filling:</p>
          <textarea
            className="constructorContent-text-area"
            defaultValue={getLesson().lessonContent}
            onChange={v => {
              let value = v.target.value;
              let storageLesson = getLesson();
              storageLesson.lessonContent = value;
              setLesson(storageLesson);
            }}
          ></textarea>
        </Container>
        <Row style={{ paddingTop: "850px" }}>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                localStorage.removeItem("lesson");
                let lesson = {
                  lessonId: -1,
                  lessonName: "",
                  lessonContent: ""
                };
                setLesson(lesson);
                window.location = "/Constructor/Block/Lesson";
              }}
            >
              Back
            </Button>
          </Col>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                this.changeLesson();
              }}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
