import React from "react";
import "./course.css";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  ListGroup
} from "react-bootstrap";
import Axios from "axios";
const getCourseInfo = () => {
  return JSON.parse(localStorage.getItem("presentCourse"));
};
const getTeacherName = () => {
  return JSON.parse(localStorage.getItem("teacher"));
};
const getTeacher = () => {
  Axios.get(
    `https://localhost:5001/api/Teachers/${getCourseInfo().teachersId}`
  ).then(res => {
    localStorage.setItem("teacher", JSON.stringify(res));
  });
};
const getLessonsNumber = blocks => {
  let number = 0;
  blocks.map(el => {
    el.lessons.map(elem => {
      number++;
    });
  });
  return number;
};
export default class coursesMainPage extends React.Component {
  componentDidMount() {
    getTeacher();

    console.log(getCourseInfo());
    console.log(getTeacherName().data.teacherName);
  }
  render() {
    return (
      <Container className="course-info">
        <Row>
          <Col>
            <p>{getCourseInfo().courseName}</p>
            <footer className="blockquote-footer">
              by {getTeacherName().data.teacherName}
            </footer>
          </Col>
          <Col>
            <h3>amout of subscribers: 120</h3>
          </Col>
        </Row>
        The course has {getCourseInfo().block.length} blocks with{" "}
        {getLessonsNumber(getCourseInfo().block)} lessons and test for each
        block in it.
        <Accordion className="course-accordion">
          {getCourseInfo().block.map((block, blockID) => (
            <Card className="course-accordion-card">
              <Accordion.Toggle
                as={Card.Header}
                eventKey={blockID}
                className="course-accordion-toggle"
              >
                {blockID + 1}. {block.blockName}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={blockID}>
                <Card.Body className="course-accordion-card-body">
                  <ListGroup>
                    {block.lessons.map((lesson, lessonID) => (
                      <ListGroup.Item
                        action
                        className="course-list-item"
                        onClick={() => {
                          localStorage.removeItem("presentLesson");
                          localStorage.setItem(
                            "presentLesson",
                            JSON.stringify(lesson)
                          );
                          window.location = "/Courses/CourseInfo/Lesson";
                        }}
                      >
                        {lessonID + 1}. {lesson.lessonName}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    );
  }
}
