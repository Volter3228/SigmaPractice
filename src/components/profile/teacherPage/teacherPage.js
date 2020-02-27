import React, { Component } from "react";
import axios from "axios";
import "./teacherPage.css";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";


const baseUrl = "https://localhost:5001/api/";
let email = "";

export default class UserPage extends Component {
  state = {
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      courses: []
    },
    showLastCourses: 3
  };

  async componentDidMount() {
    let emailRes = this.props.getDataFromApi(
      "https://localhost:5001/api/values/getlogin"
    );

    emailRes.then(res => {
      email = res;
      console.log(email);
      axios.get(`${baseUrl}Teachers/getTeacher/${email}`).then(res => {
        let data = res.data[0];
        this.setState(prevState => ({
          ...prevState,
          userInfo: {
            ...prevState.userInfo,
            firstName: data.teacherName.split(" ")[0],
            lastName: data.teacherName.split(" ")[1],
            email: email
          }
        }));
        axios
          .get(`${baseUrl}Teachers/getCourses/${data.teacherId}`)
          .then(result => {
            console.log(result);
            let courseData = [...result.data];
            console.log(courseData);
            courseData.forEach(course => {
              axios
                .get(`${baseUrl}Courses/getAmountOfSubscribers/${course.courseId}`)
                .then(amount => {
                  let obj = {
                    name: course.courseName,
                    amountOfSubscribers: amount.data
                  };
                  this.setState(prevState => ({
                    ...prevState,
                    userInfo: {
                      ...prevState.userInfo,
                      courses: [...prevState.userInfo.courses, obj]
                    }
                  }));
                });
            });
          });
      });
    });
  }

  render() {
    let lastAddedCourses = null;
    let allCourses = null;
    if (this.state.userInfo.courses.length > 0) {
      lastAddedCourses = (
        <div>
          {this.state.userInfo.courses
            .slice(0, this.state.showLastCourses)
            .map(course => {
              return (
                <Container style={{ padding: "0 0 40px 0" }}>
                  <a className="teacher-course-link" href="#">
                    {course.name}
                  </a>
                  <h3>amount of subscribers: {course.amountOfSubscribers} </h3>
                </Container>
              );
            })}
        </div>
      );
      allCourses = (
        <div className="courses-list">
          {this.state.userInfo.courses.map(course => {
            return (
              <div className="course">
                <a href="#" className="course-title">
                  {course.name}
                </a>
                <h4>amount of subscribers: {course.amountOfSubscribers} </h4>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <Container className="wrapper">
        <Row className="content">
          <Col className="user-info" md={3}>
            <Image
              className="user-avatar"
              //src="./UserAvatarTemplate.jpg"
              data-src="holder.js/300x300?text=Teacher&fg=6C5B7B&bg=C06C84&size=42"
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
            {lastAddedCourses}
            <Container className="btn-container" fluid>
              <button style={{marginRight: "10px"}} className="edit-btn">Edit account</button>
              <a className="create-link" href="/Constructor"><button className="edit-btn">Create course</button></a>
            </Container>
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
