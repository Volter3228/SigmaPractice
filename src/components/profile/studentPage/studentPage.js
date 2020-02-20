import React, { Component } from "react";
import axios from "axios";
import "./studentPage.css";
import Progress from "./progress/progress";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";

const baseUrl = "https://localhost:5001/api/";
let email = "";

export default class StudentPage extends Component {
  state = {
    userInfo: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      courses: [],
    },
    userImage: {
      file: '',
      imagePreviewUrl: '',
    },
    showLastCourses: 3,
    isEditing: false,
  };

  async componentDidMount() {
    let emailRes = this.props.getDataFromApi(
      "https://localhost:5001/api/values/getlogin"
    );

    emailRes.then(res => {
      email = res;
      console.log(email);
      axios.get(`${baseUrl}Students/getStudent/${email}`).then(res => {
        let data = res.data[0];
        this.setState(prevState => ({
          ...prevState,
          userInfo: {
            ...prevState.userInfo,
            id: data.studentId,
            firstName: data.studentName.split(" ")[0],
            lastName: data.studentName.split(" ")[1],
            email: email
          }
        }));
        axios
          .get(`${baseUrl}Students/getCourses/${data.studentId}`)
          .then(result => {
            console.log(result);
            let courseData = [...result.data];
            console.log(courseData);
            courseData.forEach(course => {
              axios
                .get(`${baseUrl}Teachers/getName/${course.teachersId}`)
                .then(teacherName => {
                  let obj = {
                    name: course.courseName,
                    teacherName: teacherName.data
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

  updateUserData(userData) {
    axios.put(`${baseUrl}Students/${this.state.userInfo.id}`,
    userData, {headers: {"Content-Type": "application/json"}}).then(res => {
      console.log(res.status);
    }).catch(err => console.log(err));
  }

  onSaveClick(event) {
    event.preventDefault();
    const data = this.state.userImage.imagePreviewUrl.split(',')[1];
    let raw = window.atob(data);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    let image = [];
    for(let i = 0; i< rawLength; i++) {
      image.push((array[i]));
    }
    const userData = {
      StudentId: this.state.userInfo.id,
      StudentPhoto: image,
    }
    this.updateUserData(userData);
  }

  handleImageChange(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState((prevState) => ({
        ...prevState,
        userImage: {
          file: file,
          imagePreviewUrl: reader.result,
        }
      }));
    }
    reader.readAsDataURL(file);
  }

  render() {
    let lastCourses = null;
    let allCourses = null;
    let image = this.state.userImage.imagePreviewUrl;
    if (this.state.userInfo.courses.length > 0) {
      lastCourses = (
        <div>
          {this.state.userInfo.courses
            .slice(0, this.state.showLastCourses)
            .map(course => {
              return (
                <Progress
                  testsPassed={course.testsPassed}
                  allTests={course.countOfTests}
                  courseTitle={course.name}
                  teacherName={course.teacherName}
                  href={course.href}
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
                <a href="#" className="course-title">
                  {course.name}
                </a>
                <h4 className="course-progress">
                  {(course.testsPassed / course.countOfTests) * 100}% completed
                </h4>
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
              data-src="holder.js/300x300?text=Student&fg=6C5B7B&bg=C06C84&size=42"
              alt="user-image"
              roundedCircle
            />
            {(!this.state.isEditing && <img src={image} alt="jopa" />)}
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
            <Container className="btn-container" fluid>
              {(!this.state.isEditing && (
                <button
                  className="edit-btn"
                  onClick={() => {
                    this.setState({ isEditing: true });
                  }}
                >
                  Edit account
                </button>
              )) ||
                (this.state.isEditing && (
                  <button
                    className="edit-btn" style={{backgroundColor: "#61D4B3"}}
                    onClick={(event) => {this.onSaveClick(event); this.setState((prevState) => ({...prevState, isEditing: false}));}}
                  >Save Changes</button>
                ))}
                <input type="file" onChange={(event) => this.handleImageChange(event)} />
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
