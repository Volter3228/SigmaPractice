import React from "react";
import "./menuBar.css";

import LogoImg from "./NavLogo.png";

import { Figure, Navbar, Nav, Dropdown } from "react-bootstrap";
// import AutorisationPage from "./autorisation/autorisation.js";
// import CoursesPage from "./autorisation/autorisation.js";
const Pad0 = {
  padding: 0,
  margin: 0
};

const navbar = {
  backgroundColor: "#6C5B7B",
  height: "100px",
  margin: "10px 20px 0 20px",
  padding: "10px 30px",
  background: "rgba(248, 177, 149, 0.8)",
  borderRadius: "20px"
};

const linkWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "60px",
  background: "#C06C84",
  border: "3px solid #C06C84",
  borderRadius: "20px",
  marginRight: "20px"
};

const profileWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "60px",
  height: "60px",
  background: "#C06C84",
  border: "3px solid #C06C84",
  borderRadius: "40px",
  marginRight: "20px"
};

const link = {
  display: "inline-block",
  fontFamily: "Montserrat",
  color: "#6C5B7B",
  fontStyle: "normal",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "20px",
  background: "#C06C84"
};

let URL_href = window.location.pathname;
function Click() {
  if (
    URL_href === "/Authorization" ||
    URL_href === "/Courses" ||
    URL_href === "/AdminPage" ||
    URL_href === "/Registration"
  ) {
    return "/";
  } else {
    return "#home";
  }
}

const Logotype = () => {
  return (
    <Navbar.Brand href={Click()}>
      <Figure
        style={{ padding: 0, margin: "0 20px 0 0" }}
        onClick={() => {
          Click();
        }}
      >
        <Figure.Image
          width={60}
          height={60}
          alt="Logo"
          src={LogoImg}
          style={Pad0}
        />
      </Figure>
    </Navbar.Brand>
  );
};

const Links = () => {
  return (
    <Navbar.Collapse className="justify-content-start">
      <Nav defaultActiveKey="/" as="ul">
        <Nav.Item style={linkWrapper} as="li">
          <Nav.Link style={link} href="/">
            Home Page
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={linkWrapper} as="li">
          <Nav.Link style={link} href="/Courses">
            Courses
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  );
};

const Profile = () => {
  if (!sessionStorage.getItem("accessToken")) {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Nav defaultActiveKey="/">
          <Nav.Item style={linkWrapper}>
            <Nav.Link style={link} href="/Authorization">
              Sign In
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    );
  } else {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Nav defaultActiveKey="/">
          <Nav.Item style={profileWrapper}>
            <Dropdown style={link}>
              <Dropdown.Toggle id="toggle" style={link}>U</Dropdown.Toggle>

              <Dropdown.Menu
                alignRight
              >
                {(sessionStorage.userRole === "Admin" && (
                  <Dropdown.Item href="/AdminPage">My Profile</Dropdown.Item>
                )) ||
                  (sessionStorage.userRole === "Teacher" && (
                    <Dropdown.Item href="/TeacherPage">
                      My Profile
                    </Dropdown.Item>
                  )) ||
                  (sessionStorage.userRole === "Student" && (
                    <Dropdown.Item href="/StudentPage">
                      My Profile
                    </Dropdown.Item>
                  ))}
                <Dropdown.Item href="/Courses">Courses List</Dropdown.Item>
                <Dropdown.Item href="/"
                  onClick={() => {
                    window.sessionStorage.removeItem("accessToken");
                    window.location.reload(false);
                  }}
                >
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    );
  }
};

const NavbarMenu = () => {
  return (
    <Navbar style={navbar} className="navbar" fixed="top">
      <Logotype />
      <Links />
      <Profile />
    </Navbar>
  );
};

export default class MenuBar extends React.Component {
  render() {
    return <NavbarMenu />;
  }
}
