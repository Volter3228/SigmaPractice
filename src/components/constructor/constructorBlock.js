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
            <li>
              Block : {el.blockName}
              <br />
              lessons:{" "}
              {el.blockLessons.map(el => (
                <li style={{ paddingLeft: "20px" }}>{el.lessonName}</li>
              ))}
            </li>
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
  alert("Saved");
}

const PostCourse = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button
        className="constructorBlock-myButton"
        onClick={() => setModalShow(true)}
      >
        Save
      </Button>

      <ModalDialog
        show={modalShow}
        onHideSave={() => {
          setModalShow(false);
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
      <Container>
        <Container className="constructorBlock-wrapper">
          <p className="constructor-font">Course name:</p>
          <input
            className="constructor-input"
            defaultValue={this.state.storageCourse.courseName}
          ></input>
          <Table responsive="sm" hover borderless>
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
            </tbody>
          </Table>
        </Container>
        <Row style={{ paddingTop: "850px" }}>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                window.location = "/Constructor";
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
                this.createBlock();
              }}
            >
              Add new block
            </Button>
          </Col>
          <Col>
            {" "}
            <PostCourse />
          </Col>
        </Row>
      </Container>
    );
  }
}
