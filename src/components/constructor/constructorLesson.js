import React from "react";
import "./constructorBlock.css";
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
        <Container className="constructorBlock-wrapper">
          <p className="constructor-font">Block id:</p>
          <input
            className="constructor-input"
            defaultValue={getBlock().blockId}
          ></input>
          <p className="constructor-font">Block name:</p>
          <input
            onChange={v => {
              let newName = v.target.value;
              this.changeBlockName(newName);
            }}
            className="constructor-input"
            defaultValue={getBlock().blockName}
          ></input>
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
              )}
            </tbody>
          </Table>
        </Container>
        <Row style={{ paddingTop: "850px" }}>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                window.location = "/Constructor/Block";
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
                this.createLesson();
              }}
            >
              Add new lesson
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
