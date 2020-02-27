import React from "react";
import "./constructorLesson.css";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import axios from "axios";

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

const TR = ({ rowIndex, name }) => {
  return (
    <tr
      onClick={() => {
        let currentLesson = getBlock().blockLessons.find(
          el => el.lessonId === rowIndex
        );
        setLesson(currentLesson);
        console.log(getBlock().blockLessons[rowIndex]);
        window.location = "/Constructor/Block/Lesson/Content";
      }}
    >
      <td style={{ width: "20px", height: "10px" }}>{rowIndex}</td>
      <td style={{ width: "20px", height: "10px" }}>{name}</td>
    </tr>
  );
};

export default class ConstructorLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageBlock: JSON.parse(localStorage.getItem("block"))
    };
  }
  createLesson = () => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();
    storageLesson.lessonId = getBlock().blockLessons.length + 1;
    storageLesson.lessonId -= 1;
    storageLesson.lessonName = "newLesson";
    storageBlock.blockLessons.push(storageLesson);
    storageCourse.courseBlocks[getBlock().blockId] = storageBlock;
    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
    this.setState({ storageBlock: storageBlock });
  };
  changeBlockName = newName => {
    let newBlock = getBlock();
    let newCourse = getCourse();
    newBlock.blockName = newName;
    newCourse.courseBlocks[getBlock().blockId] = newBlock;
    setCourse(newCourse);
    setBlock(newBlock);
  };
  render() {
    return (
      <Container>
        <Container className="constructorLesson-wrapper">
          <Row>
            <Col>
              {" "}
              <p className="constructorLesson-font">Block id:</p>
              <input
                className="constructorLesson-input"
                defaultValue={getBlock().blockId}
              ></input>
            </Col>
            <Col>
              {" "}
              <p className="constructorLesson-font">Block name:</p>
              <input
                onChange={v => {
                  let newName = v.target.value;
                  this.changeBlockName(newName);
                }}
                className="constructorLesson-input"
                defaultValue={getBlock().blockName}
              ></input>
            </Col>
          </Row>
          <Container fluid className="constructorLesson-container-table">
            <Table responsive="sm" hover borderless>
              <thead>
                <tr>
                  <th>Lesson number</th>
                  <th>Lesson Name</th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(localStorage.getItem("block")).blockLessons.map(
                  (el, i) => (
                    <TR name={el.lessonName} rowIndex={i} />
                  )
                )}{" "}
                <tr
                  
                  onClick={() => {
                    this.createLesson();
                  }}
                >
                  <td colSpan="3">
                    -------------------------------------------------------------------------------Add
                    lesson------------------------------------------------------------------------------------
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>{" "}
          <Button
            className="constructorLesson-btn"
            onClick={() => {
              window.location = "/Constructor/Block";
            }}
          >
            Back
          </Button>
        </Container>
      </Container>
    );
  }
}
