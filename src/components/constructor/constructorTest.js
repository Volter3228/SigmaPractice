import React from "react";
import "./constructorTest.css";
import { Container, Button, Form, Row, Col, Table } from "react-bootstrap";
function getCourse() {
  return JSON.parse(localStorage.getItem("course"));
}
function getBlock() {
  return JSON.parse(localStorage.getItem("block"));
}
function getLesson() {
  return JSON.parse(localStorage.getItem("lesson"));
}
function getContent() {
  return JSON.parse(localStorage.getItem("content"));
}
function getTest() {
  return JSON.parse(localStorage.getItem("test"));
}
function setCourse(obj) {
  localStorage.setItem("course", JSON.stringify(obj));
}
function setBlock(obj) {
  localStorage.setItem("block", JSON.stringify(obj));
}
function setLesson(obj) {
  localStorage.setItem("lesson", JSON.stringify(obj));
}
function setContent(obj) {
  localStorage.setItem("content", JSON.stringify(obj));
}
function setTest(obj) {
  localStorage.setItem("test", JSON.stringify(obj));
}

const Tests = () => {};
export default class ConstructorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      rightAnswerId: 0,
      allAnswers: ["Answer1", "Answer2", "Answer3", "Answer4"]
    };
  }

  changeQuestion = newName => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();
    let storageTest = getTest();
    storageTest.question = newName;
    storageLesson.lessonContent.tests[storageTest.testId] = storageTest;
    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;
    setTest(storageTest);
    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
  };
  changeAnswer = (newAnswer, id) => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();
    let storageTest = getTest();
    storageTest.allAnswers[id] = newAnswer;
    storageLesson.lessonContent.tests[storageTest.testId] = storageTest;
    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;
    setTest(storageTest);
    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
  };
  render() {
    return (
      <Container>
        <Container fluid className="constructorTest-question">
          <p className="constructor-font">Question:</p>
          <input
            onChange={v => {
              let newName = v.target.value;
              this.changeQuestion(newName);
            }}
            className="constructor-input"
            defaultValue={getTest().question}
          ></input>
        </Container>

        <Container className="constructorTest-ansewers">
          <Row>
            {" "}
            {getTest().allAnswers.map((el, i) => (
              <Col>
                {" "}
                <p className="constructor-font">Answer {i + 1}:</p>
                <input
                  onChange={v => {
                    let newAnswer = v.target.value;
                    this.changeAnswer(newAnswer, i);
                  }}
                  className="constructor-input"
                  defaultValue={el}
                ></input>
                <Form.Check
                  type="radio"
                  name="type"
                  checked={getTest().rightAnswerId === i}
                  id={1}
                  label="rigth answer"
                  onChange={() => {
                    let storageTest = getTest();
                    storageTest.rightAnswerId = i;
                    setTest(storageTest);

                    this.setState({ rightAnswerId: el });
                  }}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <Row style={{ paddingTop: "850px" }}>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                localStorage.removeItem("test");
                let test = {
                  testId: -1,
                  question: "",
                  rightAnswerId: 0,
                  allAnswers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"]
                };
                setTest(test);
                window.location = "/Constructor/Block/Lesson/Content";
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
                let storageCourse = getCourse();
                let storageBlock = getBlock();
                let storageLesson = getLesson();
                let storageTest = getTest();

                storageLesson.lessonContent.tests[
                  storageTest.testId
                ] = storageTest;
                storageBlock.blockLessons[
                  storageLesson.lessonId
                ] = storageLesson;
                storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;
                setTest(storageTest);
                setLesson(storageLesson);
                setBlock(storageBlock);
                setCourse(storageCourse);
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
