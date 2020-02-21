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
    return (
      <Container className="constructorContent-test">
        <Table responsive="sm" hover borderless>
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
            )}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return (
      <Container fluid>
        {" "}
        <p className="constructor-font">Add lesson filling:</p>
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
const Settings = props => {
  if (props.type === "test") {
    return (
      <Col>
        <Button
          onClick={() => {
            props.createTest();
          }}
        >
          Add test
        </Button>
      </Col>
    );
  } else {
    return <Col></Col>;
  }
};
export default class ConstructorContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonName: "",
      isChecked: true,
      lessonContent: {},
      type: ""
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
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
  render() {
    return (
      <Container>
        <Container className="constructorContent-wrapper">
          <Row>
            <Col>
              {" "}
              <p className="constructor-font">Add lesson name:</p>
              <input
                className="constructor-input"
                onChange={v => {
                  let value = v.target.value;
                  this.changeNameLesson(value);
                }}
                defaultValue={getLesson().lessonName}
              ></input>
            </Col>
            <Col>
              <p className="constructor-font">Lesson type:</p>
              <Form>
                <Form.Check
                  type="radio"
                  name="type"
                  id={1}
                  label="test"
                  onChange={() => {
                    this.toggleChange();
                    this.setState({ type: "test" });
                  }}
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id={1}
                  label="text"
                  checked={this.state.isChecked}
                  onChange={() => {
                    this.toggleChange();
                    this.setState({ type: "text" });
                  }}
                />
              </Form>
            </Col>
            <Settings type={this.state.type} createTest={this.createTest} />
          </Row>
          <Content type={this.state.type} createText={this.createText} />
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
            <Button className="constructorBlock-myButton" onClick={() => {}}>
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
