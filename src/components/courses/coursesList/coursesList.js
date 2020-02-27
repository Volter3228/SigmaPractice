import React, { Component } from "react";
import "./coursesList.css";
//import { Dropdown } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";

import { Table, Container } from "react-bootstrap";

//import { MDBCol, MDBInput } from "mdbreact";
const SearchPage = () => {
  return (
    <Row>
      <Col md="6">
        <input placeholder="Search" type="text" />
      </Col>
    </Row>
  );
};

export default class coursesList extends Component {
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

  refreshList() {
    fetch("https://localhost:5001/api/Courses")
      .then(response => response.json())
      .then(data => {
        this.setState({ courses: data });
      });
    fetch("https://localhost:5001/api/Categories")
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data });
      });
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
    //  const{list} = this.props
    const { courses } = this.state;
    const { listOpen, headerTitle } = this.state;
    const { categories } = this.state;
    return (
      <Container>
        <div className="dd-wrapper">
          <SearchPage />
          <div className="dd-header" onClick={() => this.toggleList()}>
            <div className="dd-header-title">{headerTitle}</div>
            {/* {listOpen
                ? <FontAwesome name="angle-up" size="2x"/>
                : <FontAwesome name="angle-down" size="2x"/>
              } */}
          </div>
          {listOpen && (
            <ul className="dd-list">
              {courses.map(course => (
                <li className="dd-list-item" key={course.courseId}>
                  {course.dataOfCreation}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <ul>
            {categories.map(category => (
              <Button key={category.categoryId}>{category.categoryName}</Button>
            ))}
          </ul>
        </div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Course:</th>
              <th>Rating:</th>
              <th>Description:</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseId}>
                <td>{course.courseName}</td>
                <td>{course.courseRating}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
