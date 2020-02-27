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
  fontFamily: "Montserrat"
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
    <Navbar.Collapse className="menuBar-navbar-collapse">
      <Nav defaultActiveKey="/" as="ul" className="menuBar-nav">
        <Nav.Item className="menuBar-btn" as="li">
          <Nav.Link className="menuBar-btn-link" style={link} href="/">
            Home Page
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="menuBar-btn" as="li">
          <Nav.Link className="menuBar-btn-link" style={link} href="/Courses">
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
      <Navbar.Collapse className="menuBar-navbar-collapse justify-content-end">
        <Nav defaultActiveKey="/" className="menuBar-nav-sign-in">
          <Nav.Item className="menuBar-btn">
            <Nav.Link
              className="menuBar-btn-link"
              style={link}
              href="/Authorization"
            >
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
              <Dropdown.Toggle id="toggle" style={link}>
                U
              </Dropdown.Toggle>

              <Dropdown.Menu alignRight>
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
                <Dropdown.Item
                  href="/"
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
    <Navbar className="menuBar-navBar" fixed="top">
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
