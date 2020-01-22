import React from "react";
import LogoImg from "./NavLogo.png";
import { Figure, Navbar, Nav } from "react-bootstrap";
import AutorisationPage from "./autorisation/autorisation.js";
import CoursesPage from "./autorisation/autorisation.js";
const Pad0 = {
  padding: 0,
  margin: 0
};

const FontStyle = {
  color: "white",
  fontSize: "18px",
  fontFamily: "Font Awesome 5 Brands Regular"
};
let URL_href = window.location.href;
function Click() {
  if (
    URL_href === "http://localhost:3000/Autorisation" ||
    URL_href === "http://localhost:3000/Courses"
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
        style={Pad0}
        onClick={() => {
          Click();
        }}
      >
        <Figure.Image
          width={50}
          height={50}
          alt="Logo"
          src={LogoImg}
          style={Pad0}
        />
      </Figure>
    </Navbar.Brand>
  );
};
const Courses = () => {
  return (
    <Navbar.Collapse className="justify-content-end">
      <Nav defaultActiveKey="/" as="ul">
        <Nav.Item as="li">
          <Nav.Link style={FontStyle} href="http://localhost:3000/Autorisation">
            Autorisation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link style={FontStyle} href="http://localhost:3000/Courses">
            Courses
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  );
};

const NavbarMenu = () => {
  if (
    !(
      URL_href === "http://localhost:3000/Autorisation" ||
      URL_href === "http://localhost:3000/Courses"
    )
  ) {
    return (
      <Navbar
        style={{ backgroundColor: "#002850", height: "60px" }}
        fixed="top"
      >
        <Logotype />
        <Courses />
      </Navbar>
    );
  } else {
    return (
      <Navbar
        style={{ backgroundColor: "#002850", height: "60px" }}
        fixed="top"
      >
        <Logotype />
      </Navbar>
    );
  }
};

export default class MenuBar extends React.Component {
  render() {
    return <NavbarMenu />;
  }
}
