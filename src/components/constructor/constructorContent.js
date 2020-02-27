import React from "react";
import "./constructorContent.css";
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

function setTest(obj) {
  localStorage.setItem("test", JSON.stringify(obj));
}
const TR = ({ rowIndex, name }) => {
  return (
    <tr
      onClick={() => {
        let currentTest = getLesson().lessonContent.tests.find(
          el => el.testId === rowIndex
        );
        setTest(currentTest);
        console.log(currentTest);
        window.location = "/Constructor/Block/Lesson/Content/Test";
      }}
    >
      <td style={{ width: "20px", height: "10px" }}>{rowIndex}</td>
      <td style={{ width: "20px", height: "10px" }}>{name}</td>
    </tr>
  );
};

const Content = props => {
  if (props.type === "test") {
    console.log(getLesson());
    return (
      <Container fluid className="constructorContent-test">
        <Table hover borderless>
          <thead>
            <tr>
              <th>Test number</th>
              <th>Test question</th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(localStorage.getItem("lesson")).lessonContent.tests.map(
              (el, i) => (
                <TR name={el.question} rowIndex={i} />
              )
            )}{" "}
            <tr
              onClick={() => {
                props.createTest();
              }}
            >
              <td colSpan="3">
                -------------------------------------------------------------------------------Add
                lesson------------------------------------------------------------------------------------
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return (
      <Container fluid className="constructorContent-container">
        {" "}
        <p className="constructorContent-font">Add lesson filling:</p>
        <textarea
          className="constructorContent-text-area"
          defaultValue={getLesson().lessonContent.text}
          onChange={v => {
            let value = v.target.value;
            props.createText(value);
          }}
        ></textarea>
      </Container>
    );
  }
};

export default class ConstructorContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lessonName: "",
      isChecked: false,
      lessonContent: {},
      type: getLesson().lessonContent.type
    };
  }

  changeNameLesson = newName => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();

    storageLesson.lessonName = newName;
    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;
    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
  };
  createText = text => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();

    storageLesson.lessonContent.text = text;
    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;

    console.log(storageLesson.lessonContent.text);

    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);

    console.log(getLesson().lessonContent.text);
  };
  createTest = obj => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();

    let storageTest = getTest();
    storageTest.testId = getLesson().lessonContent.tests.length + 1;
    storageTest.testId--;
    storageTest.question = "newQuestion";
    //storageContent.tests.push(storageTest);
    storageLesson.lessonContent.tests.push(storageTest);
    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;

    setTest(storageTest);

    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
    this.setState({ content: storageLesson });
  };

  toggleChange = type => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    let storageLesson = getLesson();
    storageLesson.lessonContent.type = type;
    storageBlock.blockLessons[storageLesson.lessonId] = storageLesson;
    storageCourse.courseBlocks[storageBlock.blockId] = storageBlock;
    setLesson(storageLesson);
    setBlock(storageBlock);
    setCourse(storageCourse);
    this.setState({
      isChecked: !this.state.isChecked
    });
    console.log(getLesson());
  };
  componentDidMount() {
    console.log(getLesson());
  }
  render() {
    return (
      <Container className="constructorContent-wrapper">
        <Row>
          <Col>
            {" "}
            <p className="constructorContent-font">Add lesson name:</p>
            <input
              className="constructorContent-input"
              onChange={v => {
                let value = v.target.value;
                this.changeNameLesson(value);
              }}
              defaultValue={getLesson().lessonName}
            ></input>
          </Col>
          <Col>
            <p className="constructorContent-font">Lesson type:</p>
            <Form>
              <Form.Check
                type="radio"
                name="type"
                id={1}
                label="test"
                checked={getLesson().lessonContent.type === "test"}
                onChange={() => {
                  this.toggleChange("test");

                  this.setState({ type: "test" });
                }}
              />
              <Form.Check
                type="radio"
                name="type"
                id={1}
                checked={getLesson().lessonContent.type === "text"}
                label="text"
                onChange={() => {
                  this.toggleChange("text");
                  this.setState({ type: "text" });
                }}
              />
            </Form>
          </Col>
        </Row>
        <Container fluid className="constructorContent-container">
          <Content
            type={this.state.type}
            createText={this.createText}
            createTest={this.createTest}
          />
        </Container>

        <Button
          className="constructorContent-btn"
          onClick={() => {
            localStorage.removeItem("lesson");
            let lesson = {
              lessonId: -1,
              lessonName: "",
              lessonContent: {
                type: "text",
                text: "",
                tests: []
              }
            };
            setLesson(lesson);
            window.location = "/Constructor/Block/Lesson";
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}
