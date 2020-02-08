import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import "./progress.css";

const progress = props => {
  const now = (props.testsPassed / props.allTests) * 100;
  // now - Boostrap attribute, % of progress
  return (
    <Container style={{padding: '0 0 40px 0'}} >
      <h2>{props.courseTitle}</h2>
      <h3>by {props.teacherName}</h3>
      <ProgressBar now={now} />
    </Container>
  );
};

export default progress;
