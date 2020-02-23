import React from "react";
import "./courseLesson.css";
import { Container, Row, Col, Button } from "react-bootstrap";
function getLesson() {
  return JSON.parse(localStorage.getItem("presentLesson"));
}
export default class coursesMainPage extends React.Component {
  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem("presentLesson")));
  }
  render() {
    return (
      <Container>
        <Container className="courseInfo-container">
          <h1 style={{ padding: "20px" }}>{getLesson().lessonName}</h1>
          <textarea readOnly className="courseInfo-textArea">
            {getLesson().content}
          </textarea>
        </Container>{" "}
        <Row style={{ paddingTop: "80%" }}>
          <Col>
            {" "}
            <Button
              onClick={() => {
                window.location = "/Courses/CourseInfo";
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
