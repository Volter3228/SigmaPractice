import React from "react";
import "./constructorBlock.css";
import { Container, Button, Table, Row, Col } from "react-bootstrap";

const TD = props => {
  let data;
  if (props.colIndex === 0) {
    data = props.rowIndex + 1;
  } else {
    data = props.data;
  }
  return (
    <td style={{ width: "20px", height: "10px" }} onClick={() => {}}>
      {data}
    </td>
  );
};
const TR = ({ rowIndex, data }) => {
  let blockInfo = {
    name: "name",
    id: 0,
    lesson: []
  };
  return (
    <tr
      onClick={() => {
        blockInfo.name = data[1];
        blockInfo.id = rowIndex + 1;

        localStorage.removeItem("block");
        localStorage.setItem("block", JSON.stringify(blockInfo));
        window.location = "/Constructor/Block/Lesson";
      }}
    >
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
  addBlock = () => {
    let storageObj = JSON.parse(localStorage.getItem("course"));
    let blockArr = [...this.state.block];
    let obj = [null, "NewBlock", 0];
    storageObj.block.push(obj);

    blockArr.push(obj);
    localStorage.setItem("course", JSON.stringify(storageObj));
    this.setState({ block: blockArr });
  };
  render() {
    return (
      <Container>
        <Container className="constructorBlock-wrapper">
          <p className="constructor-font">Course name:</p>
          <input
            className="constructor-input"
            defaultValue={JSON.parse(localStorage.getItem("course")).name}
          ></input>
          <Table responsive="sm" hover borderless>
            <thead>
              <tr>
                <th>Block number</th>
                <th>Block Name</th>
                <th>Lessons amount</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(localStorage.getItem("course")).block.map((el, i) => (
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
                window.location = "/Constructor";
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
                this.addBlock();
              }}
            >
              Add new block
            </Button>
          </Col>
          <Col>
            {" "}
            <Button className="constructorBlock-myButton">
              Post the course
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
