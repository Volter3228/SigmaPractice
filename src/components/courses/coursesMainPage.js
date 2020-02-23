import React from "react";
import "./coursesMainPage.css";
import { Container, Button } from "react-bootstrap";
import Axios from "axios";
const url = "https://localhost:5001";
const getCourseInfo = () => {
  return JSON.parse(localStorage.getItem("presentCourse"));
};
const setCourseInfo = courseInfo => {
  localStorage.setItem("presentCourse", JSON.stringify(courseInfo));
};

function setCourse(localCourse) {
  localStorage.clear();
  setCourseInfo(localCourse);

  console.log(JSON.parse(localStorage.getItem("presentCourse")));
}
function getCourse() {
  Axios.get(`${url}/api/Courses/1`).then(course => {
    localStorage.clear();
    let localCourse = course.data;
    Axios.get(`${url}/api/Courses/${localCourse.courseId}/Blocks`).then(
      blocks => {
        localCourse.block = blocks.data;
        localCourse.block.map(el => {
          Axios.get(`${url}/api/Blocks/${el.blockId}/Lessons`).then(lessons => {
            el.lessons = lessons.data;
          });
        });

        console.log(localCourse);
        setTimeout(setCourse, 2000, localCourse);
      }
    );
  });
}

export default class coursesMainPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={{ paddingTop: "220px" }}>
        <Button
          onClick={() => {
            getCourse();

            window.location = "/Courses/CourseInfo";
          }}
        >
          get Course
        </Button>
      </Container>
    );
  }
}
