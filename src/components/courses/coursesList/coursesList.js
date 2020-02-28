import React, { Component } from "react";
import "./coursesList.css";
import {
  Button,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Card
} from "react-bootstrap";

import { Table, Container } from "react-bootstrap";

export default class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      headerTitle: "Uploading date",
      categories: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }
  setCourse = course => {
    localStorage.setItem("currentCourseId", JSON.stringify(course.courseId));
  };
  refreshList() {
    fetch("https://localhost:5001/api/Courses")
      .then(response => response.json())
      .then(data => {
        this.setState({ courses: data }, () => {
          console.log(this.state);
        });
      });
    // fetch("https://localhost:5001/api/Categories")
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ categories: data });
    //   });
  }

  handleClickOutside() {
    this.setState({
      courses: [],
      listOpen: false,
      headerTitle: "Uploading date"
    });
  }
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
      headerTitle: "Uploading date"
    }));
  }
  render() {
    const { courses } = this.state;
    const { categories } = this.state;
    return (
      <Container className="bg">
        {/* <Container>
          <Row className="justify-content-md-center" xs={6} md={4}>
            <DropdownButton id="dropdown-basic-button" title="Updating date:">
              {courses.map(course => (
                <Dropdown.Item key={course.courseId}>
                  {course.dataOfCreation}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Row>
        </Container> */}
        {/* <Row>
          <Col xs={6} md={4}>
            <p>Popular categories:</p>
          </Col>
        </Row> */}
        {/* <Container>
          <Row>
            {" "}
            {categories.map(category => (
              <Col key={category.categoryId}>
                <Card className="categorystl">
                  <Card.Body>
                    <Card.Title>{category.categoryName}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <br />
        </Container> */}{" "}
        <Container className="courseList-content">
          <input
            className="search"
            type="text"
            placeholder="Search course..."
          />
          <Container className="courseList-content-list">
            {" "}
            <Row>
              {courses.map(course => (
                <Col xs={6} md={4} key={course.courseId}>
                  <Card className="coursestl">
                    <Card.Body
                      onClick={() => {
                        this.setCourse(course);
                        window.location = "/Courses/CourseInfo";
                      }}
                    >
                      <Card.Title>{course.courseName}</Card.Title>
                      <Card.Text>
                        {course.description}
                        <br />
                        {/* Rating: {course.courseRating} */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Container>
      </Container>
    );
  }
}
