import React from "react";
import "./course.css";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  ListGroup
} from "react-bootstrap";
import axios from "axios";
//import { date } from "yup";
const baseUrl = "https://localhost:5001/api/";

const getLessonsNumber = blocks => {
  let number = 0;
  blocks.forEach(block => {
    number += block.lessons.length;
  });
  return number;
};

const getTestsNumber = blocks => {
  let number = 0;
  blocks.forEach(block => {
    number += block.tests.length;
  });
  return number;
};
export default class CourseInfo extends React.Component {
  state = {
    course: {
      id: 0,
      name: "",
      creationDate: "",
      rating: "",
      teachersId: "",
      teacherName: "",
      courseCategory: [],
      blocks: [],
      amountOfSubscribers: 0
    },
    isSubscribed: false,
    userId: -1
  };

  componentDidMount() {
    let userId = -1;
    let subscribed = false;
    axios
      .get(
        `${baseUrl}Courses/${JSON.parse(
          localStorage.getItem("currentCourseId")
        )}`
      )
      .then(course => {
        let data = course.data;
        console.log(course.data);
        axios.get(`${baseUrl}Courses/${data.courseId}/Blocks`).then(blocks => {
          data.block = blocks.data;
          console.log(blocks);
          data.block.forEach(el => {
            axios
              .get(`${baseUrl}Blocks/${el.blockId}/Lessons`)
              .then(lessons => {
                axios
                  .get(`${baseUrl}Blocks/${el.blockId}/Tests`)
                  .then(tests => {
                    console.log(tests);
                    el.lessons = [...lessons.data];
                    el.tests = [...tests.data];
                    el.tests.forEach(test => {
                      axios
                        .get(`${baseUrl}Tests/getQuestions/${test.testId}`)
                        .then(questions => {
                          test.questions = [...questions.data];
                          test.questions.forEach(question => {
                            axios
                              .get(
                                `${baseUrl}Tests/getAnswers/${question.questionId}`
                              )
                              .then(answers => {
                                question.answers = [...answers.data];
                              });
                          });
                        });
                    });
                  });
              });
          });
          axios
            .get(`${baseUrl}Teachers/getName/${data.teachersId}`)
            .then(teacherName => {
              data = { ...data, teacherName: teacherName.data };
              axios
                .get(
                  `${baseUrl}Courses/getAmountOfSubscribers/${data.courseId}`
                )
                .then(amount => {
                  data = { ...data, amountOfSubscribers: amount.data };
                  console.log(data);
                  const role = sessionStorage.getItem("userRole");
                  if (role !== undefined) {
                    if (role === "Student") {
                      let emailRes = this.props.getDataFromApi(
                        "https://localhost:5001/api/values/getlogin"
                      );
                      emailRes.then(email => {
                        axios
                          .get(`${baseUrl}Students/getStudent/${email}`)
                          .then(student => {
                            userId = student.data[0].studentId;
                            console.log(data);
                            axios
                              .get(`${baseUrl}Students/isSubscribed/${userId}/${data.courseId}`)
                              .then(isSubscribed => {
                                subscribed = isSubscribed.data;
                                console.log(subscribed);
                                this.setState(prevState => ({
                                  ...prevState,
                                  isSubscribed: subscribed,
                                  userId: userId,
                                }))
                              });
                          });
                      });
                    }
                  }
                  this.setState(prevState => ({
                    ...prevState,
                    course: {
                      ...prevState.course,
                      blocks: [...data.block],
                      name: data.courseName,
                      id: data.courseId,
                      teacherName: data.teacherName,
                      amountOfSubscribers: data.amountOfSubscribers,
                      creationDate: data.creationDate,
                      courseCategory: [...data.courseCategory]
                    }
                  }));
                });
            });
        });
      });
  }

  async onSubscribe() {
    
    const subscription = {
      courseId: this.state.course.id,
      studentId: this.state.userId,
      dateOfOverview: "10.02.2020",
      courses: [],
      students: [],
    };
    await axios.post(`${baseUrl}Students/addSubscription`, subscription, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log(response);
    });

    this.setState(prevState => ({
      ...prevState,
      isSubscribed: true
    }));
  }

  onUnsubscribe() {
    axios.delete(`${baseUrl}Students/unsubscribe/${this.state.userId}/${this.state.course.id}`).then(response => {
      console.log(response);
    });

    this.setState(prevState => ({
      ...prevState,
      isSubscribed: false,
    }));
  }

  render() {
    return (
      <Container className="course-info">
        <Row style={{ marginBottom: "30px" }}>
          <Col md={9}>
            <h1 className="course-info-title text-font">
              {this.state.course.name}
            </h1>
            <cite className="course-info-author-name text-font">
              by {this.state.course.teacherName}
            </cite>
          </Col>
          <Col>
            <h2 className="course-info-subscribers text-font">
              Amout of subscribers: {this.state.course.amountOfSubscribers}
            </h2>
          </Col>
        </Row>
        {console.log(this.state.isSubscribed)}
        {(!this.state.isSubscribed && (
          <button onClick={this.onSubscribe.bind(this)}>Subscribe</button>
        )) ||
          (this.state.isSubscribed && (<button onClick={this.onUnsubscribe.bind(this)}>Subscribed</button>))}
        <p className="course-info-description text-font">
          Here would be course info text, Pavlo, we are waiting...
        </p>
        <p className="course-info-blocks-description text-font">
          The course has {this.state.course.blocks.length} blocks,{" "}
          {getLessonsNumber(this.state.course.blocks)} lessons and{" "}
          {getTestsNumber(this.state.course.blocks)} tests in all.
        </p>
        <Accordion className="course-accordion">
          {this.state.course.blocks.map((block, blockID) => (
            <Card className="course-accordion-card">
              <Accordion.Toggle
                as={Card.Header}
                eventKey={blockID}
                className="course-accordion-toggle unselectable"
              >
                {blockID + 1}. {block.blockName}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={blockID}>
                <Card.Body className="course-accordion-card-body">
                  <ListGroup>
                    {block.lessons.map((lesson, lessonID) => (
                      <ListGroup.Item
                        action
                        className="course-list-item"
                        onClick={() => {
                          localStorage.removeItem("currentLesson");
                          localStorage.setItem(
                            "currentLesson",
                            JSON.stringify(lesson)
                          );
                          window.location = "/Courses/CourseInfo/Lesson";
                        }}
                      >
                        {lessonID + 1} . {lesson.lessonName}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    );
  }
}
