import React from "react";
import "./constructorContent.css";
import { Container, Button, Table, Row, Col } from "react-bootstrap";

export default class ConstructorBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    };
  }
  componentDidMount() {
    let block = [];
    let obj = [1, "BlockName"];
    block.push(obj);
    block.push(obj);
    block.push(obj);
    block.push(obj);
    block.push(obj);
    block.push(obj);
    block.push(obj);
    block.push(obj);
    block.push(obj);
    this.setState({ block: block });
  }

  render() {
    return (
      <Container>
        <Container className="constructorContent-wrapper">
          <p className="constructor-font">Add lesson name:</p>
          <input className="constructor-input"></input>
          <p className="constructor-font">Add lesson filling:</p>
          <textarea className="constructorContent-text-area"></textarea>
        </Container>
        <Row style={{ paddingTop: "850px" }}>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                window.location = "/Constructor/Block/Lesson";
              }}
            >
              Back
            </Button>
          </Col>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                alert("Create");
              }}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
