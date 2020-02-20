import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import "./progress.css";

const progress = props => {
  const now = (props.testsPassed / props.allTests) * 100;
  // now - Boostrap attribute, % of progress
  return (
    <Container style={{padding: '0 0 40px 0'}} >
      <a className="course-link" href="#">{props.courseTitle}</a>
      <svg className="info-img" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.72867 0 0 6.72867 0 15C0 23.2713 6.72867 30 15 30C23.2713 30 30 23.2713 30 15C30 6.72867 23.2713 0 15 0ZM15 6.25008C15.6901 6.25008 16.2499 6.80992 16.2499 7.5C16.2499 8.19008 15.6901 8.74992 15 8.74992C14.3099 8.74992 13.7501 8.19008 13.7501 7.5C13.7501 6.80992 14.3099 6.25008 15 6.25008ZM17.8125 23.7499H12.1875C11.4963 23.7499 10.9376 23.1901 10.9376 22.5C10.9376 21.8099 11.4963 21.2501 12.1875 21.2501H13.7501V13.7501H12.8126C12.1214 13.7501 11.5624 13.19 11.5624 12.4999C11.5624 11.8101 12.1214 11.25 12.8126 11.25H15C15.6912 11.25 16.2499 11.8101 16.2499 12.4999V21.2501H17.8125C18.5037 21.2501 19.0624 21.8099 19.0624 22.5C19.0624 23.1901 18.5037 23.7499 17.8125 23.7499Z" fill="#6C5B7B"/>
      </svg>
      <h3>by {props.teacherName}</h3>
      <ProgressBar now={now} />
    </Container>
  );
};

export default progress;
