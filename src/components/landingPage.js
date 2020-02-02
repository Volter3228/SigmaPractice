import React from "react";
import "./landingPage.css";

import AuthorizationPage from "./authorization/authorization.js";
import RegistrationPage from "./registration/registration.js";
import CoursesPage from "./courses/coursesMainPage.js";
import MenuBar from "./menuBar.js";
import AdminPage from "./profile/adminPage.js";

import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getAllByDisplayValue } from "@testing-library/react";
const url = "https://localhost:44391/api/Admins";

let tokenKey = "accessToken";
async function getApiData() {
  const response = await fetch(url);
  const myJson = await response.json();
  alert(JSON.stringify(myJson));
  console.log(JSON.stringify(myJson));
}

async function getTokenAsync(values, updateAdmin) {
  const formData = new FormData();
  formData.append("grand_type", "password");
  formData.append("username", values.email);
  formData.append("password", values.password);
  const response = await fetch("https://localhost:44391/token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  });
  const data = await response.json();
  if (response.ok === true) {
    window.location = "/AdminPage";
    sessionStorage.setItem(tokenKey, data.access_token);
    console.log(data.access_token);
  } else {
    console.log("Error: ", response.status, data.errorText);
  }
}
async function getDataFromApi(url) {
  const token = sessionStorage.getItem("accessToken");
  console.log(token);
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
    <Container style={{ paddingTop: "150px" }}>
      <Button
        onClick={() => {
          getApiData();
        }}
      >
        Test
      </Button>
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
        <div>
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
          <Route exact path="/Registration">
            <RegistrationPage />
          </Route>
          <Route exact path="/AdminPage">
            <AdminPage getDataFromApi={getDataFromApi} />
          </Route>
        </div>
      </Router>
    );
  }
}
