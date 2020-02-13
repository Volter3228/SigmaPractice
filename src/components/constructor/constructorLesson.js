import React from "react";
import "./constructorBlock.css";
import { Container, Button, Table, Row, Col } from "react-bootstrap";

const TD = props => {
  return (
    <td
      style={{ width: "20px", height: "10px" }}
      onClick={() => {
        window.location = "/Constructor/Block/Lesson/Content";
      }}
    >
      {props.data}
    </td>
  );
};
const TR = ({ rowIndex, data }) => {
  return (
    <tr>
      {data.map((el, i) => (
        <TD data={el} rowIndex={rowIndex} colIndex={i} />
      ))}
    </tr>
  );
};
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

    this.setState({ block: block });
  }

  render() {
    return (
      <Container>
        <Container className="constructorBlock-wrapper">
          <p className="constructor-font">Block id:</p>
          <input
            className="constructor-input"
            defaultValue={JSON.parse(localStorage.getItem("block")).id}
          ></input>
          <p className="constructor-font">Block name:</p>
          <input
            className="constructor-input"
            defaultValue={JSON.parse(localStorage.getItem("block")).name}
          ></input>
          <Table responsive="sm" hover borderless>
            <thead>
              <tr>
                <th>Lesson number</th>
                <th>Lesson Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.block.map((el, i) => (
                <TR data={el} rowIndex={i} />
              ))}
            </tbody>
          </Table>
        </Container>
        <Row style={{ paddingTop: "850px" }}>
          <Col>
            {" "}
            <Button
              className="constructorBlock-myButton"
              onClick={() => {
                window.location = "/Constructor/Block";
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
                let storageCourse = JSON.parse(localStorage.getItem("course"));
                let currentBlock = JSON.parse(localStorage.getItem("block"));
                console.log(storageCourse);
                console.log(currentBlock);
                storageCourse.block[currentBlock.id - 1][2] += 1;
                console.log(storageCourse);
                localStorage.setItem("course", JSON.stringify(storageCourse));
                let blockArr = [...this.state.block];
                let obj = [1, "NewLesson"];
                blockArr.push(obj);
                this.setState({ block: blockArr });
              }}
            >
              Add new lesson
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
