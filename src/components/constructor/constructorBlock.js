import React from "react";
import "./constructorBlock.css";
import {
  Container,
  Button,
  Table,
  Row,
  Col,
  Modal,
  ButtonToolbar
} from "react-bootstrap";
import Axios from "axios";

function getCourse() {
  return JSON.parse(localStorage.getItem("course"));
}
function getBlock() {
  return JSON.parse(localStorage.getItem("block"));
}
function setCourse(obj) {
  localStorage.setItem("course", JSON.stringify(obj));
}
function setBlock(obj) {
  localStorage.setItem("block", JSON.stringify(obj));
}
const ModalDialog = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Save?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Course name: {getCourse().courseName}</p>
        <p>
          Course block:{" "}
          {getCourse().courseBlocks.map(el => (
            <li>Block : {el.blockName}</li>
          ))}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHideClose} variant="secondary">
          Close
        </Button>{" "}
        <Button onClick={props.onHideSave} variant="secondary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function sendCourseIntoBd() {
  let cblock = [];
  getCourse().courseBlocks.map((block, blockI) => {
    let blockObj = {
      blockName: block.blockName,

      lessons: [],
      tests: []
    };
    block.blockLessons.map((lesson, lessonId) => {
      if (lesson.lessonContent.type === "text") {
        let lessonObject = {
          lessonName: "",
          content: ""
        };
        lessonObject.lessonName = lesson.lessonName;
        lessonObject.content = lesson.lessonContent.text;
        blockObj.lessons.push(lessonObject);
      } else {
        let testObject = {
          content: "contetn",
          questions: []
        };
        lesson.lessonContent.tests.map(question => {
          let questionObject = {
            content: "",
            answers: []
          };
          questionObject.content = question.question;
          question.allAnswers.map(answer => {
            let answerObject = {
              content: answer,
              isCorrect: false
            };
            questionObject.answers.push(answerObject);
          });
          questionObject.answers[question.rightAnswerId].isCorrect = true;
          testObject.questions.push(questionObject);
        });

        blockObj.tests.push(testObject);
      }
    });
    cblock.push(blockObj);
  });
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1;
  var curr_year = d.getFullYear();

  let date = curr_year + "-" + curr_month + "-" + curr_date;

  let postCourse = {
    courseName: getCourse().courseName,
    dataOfCreation: date,
    courseRating: null,
    teachersId: 2,
    isVerfied: false,
    teachers: null,
    block: [...cblock]
  };
  console.log(postCourse);
  let st = JSON.stringify(postCourse);
  // console.log(st);
  // (async () => {
  //   const rawResponse = await fetch("https://localhost:5001/api/Courses", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(postCourse)
  //   });
  //   const content = await rawResponse.json();

  //   console.log(content);
  // })();

  // Axios.post("https://localhost:5001/api/Courses", st);
  setDataToDB(postCourse);
}
async function setDataToDB(values) {
  console.log(1);
  const response = await fetch("https://localhost:5001/api/Courses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });
  console.log(response);
  const data = await response.json();
  console.log(2);
  if (response.ok === true) {
    console.log(response);
  } else {
    console.log("Error: ", response.status, data.errorText);
  }
}
const PostCourse = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar className="constructorBlock-col">
      {" "}
      <Button
        className="constructorBlock-btn"
        onClick={() => {
          window.location = "/Constructor";
        }}
      >
        Back
      </Button>
      <Button
        className="constructorBlock-btn"
        onClick={() => setModalShow(true)}
      >
        Save
      </Button>
      <ModalDialog
        show={modalShow}
        onHideSave={() => {
          setModalShow(false);
          console.log(getCourse());
          sendCourseIntoBd();
        }}
        onHideClose={() => {
          setModalShow(false);
        }}
      />
    </ButtonToolbar>
  );
};
const TR = ({ rowIndex, blockName, blockLength }) => {
  return (
    <tr
      onClick={() => {
        let currentBlock = getCourse().courseBlocks.find(
          el => el.blockId === rowIndex
        );
        setBlock(currentBlock);
        window.location = "/Constructor/Block/Lesson";
      }}
    >
      <td style={{ width: "20px", height: "10px" }}>{rowIndex}</td>
      <td style={{ width: "20px", height: "10px" }}>{blockName}</td>
      <td style={{ width: "20px", height: "10px" }}>{blockLength}</td>
    </tr>
  );
};
export default class ConstructorBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storageCourse: JSON.parse(localStorage.getItem("course"))
    };
  }
  createBlock = () => {
    let storageCourse = getCourse();
    let storageBlock = getBlock();
    storageBlock.blockId += 1;
    storageBlock.blockName = "blockName";
    storageCourse.courseBlocks.push(storageBlock);
    setCourse(storageCourse);
    setBlock(storageBlock);
    this.setState({ storageCourse: storageCourse });
  };

  render() {
    return (
      <Container className="constructorBlock-wrapper">
        <p className="constructorBlock-font">Course name:</p>
        <input
          className="constructorBlock-input"
          defaultValue={this.state.storageCourse.courseName}
          readOnly
        ></input>
        <Container fluid className="constructorBlock-container-table">
          <Table hover borderless className="constructorBlock-table">
            <thead>
              <tr>
                <th>Block number</th>
                <th>Block Name</th>
                <th>Lessons amount</th>
              </tr>
            </thead>
            <tbody>
              {getCourse().courseBlocks.map((el, i) => (
                <TR
                  blockName={el.blockName}
                  rowIndex={el.blockId}
                  blockLength={el.blockLessons.length}
                />
              ))}
              <tr
                className="constructorBlock-tr-addBlock"
                onClick={() => {
                  this.createBlock();
                }}
              >
                <td colSpan="3">
                  -------------------------------------------------------------------------------Add
                  block------------------------------------------------------------------------------------
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
        <PostCourse />
      </Container>
    );
  }
}
