import React from "react";

import { Container, Button } from "react-bootstrap";
async function getData(url) {
  const token = sessionStorage.getItem("accessToken");
  console.log(token);
  console.log(1);
  const response = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token

      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // "Access-Control-Allow-Headers":
      //   "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    }
  });
  console.log(2);

  if (response.ok === true) {
    const data = await response.json();
    alert(data);
  } else console.log("Status: ", response.status);
}
export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null
    };
  }
  render() {
    return (
      <Container style={{ paddingTop: "150px" }}>
        <h1>adminPage</h1>
        <Button
          onClick={() => {
            getData("https://localhost:44391/api/values/getlogin");
          }}
        >
          Get login
        </Button>
        <br />
        <Button>log out</Button>
        <br />
        login:{this.state.login}
      </Container>
    );
  }
}
