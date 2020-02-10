import React from "react";
import { Container, Button } from "react-bootstrap";

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ""
    };
  }
  render() {
    return (
      <Container style={{ paddingTop: "150px" }}>
        <h1>adminPage</h1>
        <Button
          onClick={() => {
            let res = this.props.getDataFromApi(
              "https://localhost:5001/api/values/getlogin"
            );
            res.then(values => {
              this.setState({ login: values });
            });
            console.log(res);
          }}
        >
          Get login
        </Button>
        <br />
        <Button
          onClick={() => {
            window.sessionStorage.removeItem("accessToken");
          }}
        >
          log out
        </Button>
        <br />
        login:             {this.state.login}
        <br />
        <Button
          onClick={() => {
            window.location = "/Constructor";
          }}
        >
          create course
        </Button>
      </Container>
    );
  }
}
