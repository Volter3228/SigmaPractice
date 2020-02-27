import React from "react";
import "./landingPage.css";

import AuthorizationPage from "./authorization/authorization.js";
import RegistrationPage from "./registration/registration.js";
import CoursesPage from "./courses/coursesMainPage.js";
import MenuBar from "./menuBar.js";
import AdminPage from "./profile/adminPage.js";
import LogoImg from "./NavLogo.png";
import StudentPage from "./profile/studentPage/studentPage.js";
import TeacherPage from "./profile/teacherPage/teacherPage.js";
import ConstructorCourse from "./constructor/constructorCourse.js";
import ConstructorBlock from "./constructor/constructorBlock.js";
import ConstructorLesson from "./constructor/constructorLesson.js";
import ConstructorContent from "./constructor/constructorContent.js";
import ConstructorTest from "./constructor/constructorTest.js";
import CourseInfo from "./courses/course.js";
import CourseLesson from "./courses/courseLesson.js";
import { Figure, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { getAllByDisplayValue } from "@testing-library/react";
let url = "https://localhost:5001/api/";
let role = "student";

let tokenKey = "accessToken";
// async function getApiData() {
//   const response = await fetch(url);
//   const myJson = await response.json();
//   alert(JSON.stringify(myJson));
//   console.log(JSON.stringify(myJson));
// }
async function setDataToDB(url, postData, windowLocation) {
  alert(1);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  });
  console.log(response);
  const data = await response.json();
 
  if (response.ok === true) {
    window.location = windowLocation;
    console.log(data);
  } else {
    console.log("Error: ", response.status, data.errorText);
  }
}

async function getTokenAsync(values, updateAdmin) {
  let formData = new FormData();
  //formData.append("grand_type", "password");
  formData.append("AdminEmail", values.email);
  formData.append("AdminPassword", values.password);
  console.log(JSON.stringify(formData));
  const response = await fetch("https://localhost:5001/token", {
    method: "POST",
    headers: { Accept: "application/plain" },
    body: formData
  });
  const data = await response.json();
  if (response.ok === true) {
    role = data.role;
    if (role === "admin") {
      role = "Admin";
    } else if (role === "teacher") {
      role = "Teacher";
    } else if (role === "student") {
      role = "Student";
    }
    window.location = `/${role}Page`;
    url = `https://localhost:5001/api/${role}s`;
    sessionStorage.setItem(tokenKey, data.access_token);
    sessionStorage.setItem("userRole", role);
    console.log(data.access_token);
  } else {
    console.log("Error: ", response.status, data.errorText);
  }
}

//Бере токен із сесії теперішньої і якщо токен існує то ти авторизований і тобі даються дані
//якщо токена вже не існує, то виводить 401, що ти не авторизований
async function getDataFromApi(url) {
  const token = sessionStorage.getItem("accessToken");

  console.log(1);
  const response = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  });
  console.log(2);

  if (response.ok === true) {
    let data = await response.json();
    console.log(data);
    return data;
  } else console.log("Status: ", response.status);
}

const MainPage = () => {
  return (
    <Container fluid className="main-page">
      <Row>
        <Col>
          <Figure style={{ padding: 0 }}>
            <Figure.Image
              width={400}
              height={400}
              alt="Logo"
              src={LogoImg}
           
            />
          </Figure>
        </Col>
        <Col>
          <h1
            style={{
              color: "#6C5B7B",
              margin: "2% 0%",
              fontFamily: "Montserrat",
              fontSize: "3.5vw",
              fontWeight: "bold"
            }}
          >
            Try the best courses from the best teachers!
          </h1>
        </Col>
      </Row>
      {/* <Button
        onClick={() => {
          getApiData();
        }}
      >
        Test
      </Button> */}
    </Container>
  );
};

export default class LandingPage extends React.Component {
  state = {
    person: null,
    adminData: null
  };

  render() {
    return (
      <Router>
        <div className="bg">
          <Container fluid>
            <MenuBar />
          </Container>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/Authorization">
            <AuthorizationPage getTokenAsync={getTokenAsync} />
          </Route>
          <Route exact path="/Courses">
            <CoursesPage />
          </Route>
          <Route exact path="/Courses/CourseInfo">
            <CourseInfo />
          </Route>
          <Route exact path="/Courses/CourseInfo/Lesson">
            <CourseLesson />
          </Route>
          <Route exact path="/Registration">
            <RegistrationPage setDataToDB={setDataToDB} />
          </Route>
          <Route exact path="/AdminPage">
            <AdminPage getDataFromApi={getDataFromApi} />
          </Route>
          <Route exact path="/StudentPage">
            <StudentPage getDataFromApi={getDataFromApi} />
          </Route>
          <Route exact path="/TeacherPage">
            <TeacherPage getDataFromApi={getDataFromApi} />
          </Route>
          <Route exact path="/Constructor">
            <ConstructorCourse />
          </Route>
          <Route exact path="/Constructor/Block">
            <ConstructorBlock />
          </Route>
          <Route exact path="/Constructor/Block/Lesson">
            <ConstructorLesson getDataFromApi={getDataFromApi} />
          </Route>
          <Route exact path="/Constructor/Block/Lesson/Content">
            <ConstructorContent />
          </Route>
          <Route exact path="/Constructor/Block/Lesson/Content/Test">
            <ConstructorTest />
          </Route>
        </div>
      </Router>
    );
  }
}
