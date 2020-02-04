import React, { Component } from "react";
import "./registration.css";
import { Formik } from "formik";
import * as Yup from "yup";

const RegistrationPage = props => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log("Submitting");

      let objToPost = {
        admin_id: 7,
        admin_email: values.email,
        admin_password: values.password
      };

      props.setDataToDB(
        "https://localhost:44391/api/Admins",
        objToPost,
        "/Authorization"
      );
      console.log(values);
    }}
    validationSchema={Yup.object().shape({
      firstName: Yup.string().required("Required"),

      lastName: Yup.string().required("Required"),

      email: Yup.string()
        .email("Invalid email")
        .required("Required"),

      password: Yup.string()
        .min(4, "Password is too short - should be 4 chars minimum.")
        .required("Required")
        .matches(/(?=.*[0-9])/, "Password must contain a number."),

      confirmPassword: Yup.string()
        .equalTo(Yup.ref("password"), "Passwords must match")
        .required("Required")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;

      return (
        <div className="inner-container">
          <div className="register-box">
            <h1 className="title">P</h1>
            <h3 className="subtitle">Pustota</h3>

            <form onSubmit={handleSubmit}>
              <input
                className={errors.firstName && touched.firstName && "errors"}
                name="firstName"
                type="text"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <div className="input-feedback">{errors.firstName}</div>
              )}
              <input
                className={errors.lastName && touched.lastName && "errors"}
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName && (
                <div className="input-feedback">{errors.lastName}</div>
              )}
              <input
                className={errors.email && touched.email && "errors"}
                name="email"
                type="text"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
              <input
                className={errors.password && touched.password && "errors"}
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
              <input
                className="register-input"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-feedback">{errors.confirmPassword}</div>
              )}
              <input
                disabled={isSubmitting}
                type="submit"
                value="REGISTER"
                className="register-btn"
              />
              <a style={{ float: "right" }} href="/Authorization">
                Already have an account?
              </a>
            </form>
          </div>
        </div>
      );
    }}
  </Formik>
);

const equalTo = (ref, msg) => {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path
    },
    test: function(value) {
      return value === this.resolve(ref);
    }
  });
};
Yup.addMethod(Yup.string, "equalTo", equalTo);

export default RegistrationPage;
