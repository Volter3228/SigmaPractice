import React, { Component } from "react";
import "./userPage.css";
import Progress from "./progress/progress";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";

export default class UserPage extends Component {
  state = {
    userInfo: {
      firstName: "Sergii",
      lastName: "Pukhta",
      email: "poohtych@gmail.com",
      courses: [
        {
          title: "React Guide",
          teacherName: "Pavliy Sergio",
          countOfTests: 10,
          testsPassed: 4
        },
        {
          title: "C# Guide",
          teacherName: "Marichka Levchyshyn",
          countOfTests: 10,
          testsPassed: 8
        },
        {
          title: "Smekal o4ka",
          teacherName: "Volodymyr Oleksandrovych",
          countOfTests: 10,
          testsPassed: 6
        },
        {
          title: "UI/UX Design Guide",
          teacherName: "Sergiy Pukhta",
          countOfTests: 10,
          testsPassed: 2
        },
        {
          title: "QA Guide",
          teacherName: "Yaroslav Bendarevskiy",
          countOfTests: 10,
          testsPassed: 10
        }
      ]
    },
    showLastCourses: 3
  };

  render() {
    let lastCourses = null;
    let allCourses = null;

    if (this.state.userInfo.courses.length > 0) {
      lastCourses = (
        <div>
          {this.state.userInfo.courses.slice(0, this.state.showLastCourses).map(course => {
            return (
              <Progress
                testsPassed={course.testsPassed}
                allTests={course.countOfTests}
                courseTitle={course.title}
                teacherName={course.teacherName}
              />
            );
          })}
        </div>
      );
      allCourses = (
        <div className="courses-list">
          {this.state.userInfo.courses.map(course => {
            return (
              <div className="course">
                <a href="#" className="course-title">{course.title}</a>
                <h4 className="course-progress">{(course.testsPassed/course.countOfTests)*100}% completed</h4>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <Container className="wrapper">
        <Row className="content">
          <Col className="user-info" md={3}>
            <Image
              className="user-avatar"
              //src="./UserAvatarTemplate.jpg"
              data-src="holder.js/300x300?text=SP&fg=6C5B7B&bg=C06C84&size=60"
              alt="user-image"
              roundedCircle
            />
            <Card
              style={{ width: "100%", background: "rgba(246, 114, 128, 0.8)" }}
            >
              <ListGroup variant="flush">
                <ListGroup.Item className="list-group-item">
                  <h2 className="title">First name</h2>
                  <h1 className="user-full-name">
                    {this.state.userInfo.firstName}
                  </h1>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item">
                  <h2 className="title">Last name</h2>
                  <h1 className="user-full-name">
                    {this.state.userInfo.lastName}
                  </h1>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item">
                  <h2 className="title">E-mail</h2>
                  <h1 className="user-email">{this.state.userInfo.email}</h1>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          <Col className="last-courses-list" md={6}>
            <h1>Last courses</h1>
            {lastCourses}
            <Container className="btn-container" fluid><button className="edit-btn">Edit account</button></Container>
          </Col>

          <Col className="all-courses-list" md={3}>
            <h1>My courses</h1>
            {allCourses}
          </Col>
        </Row>
      </Container>
    );
  }
}
