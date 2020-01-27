import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./authorization.css";

const AuthorizationPage = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      console.log("Submitting");
      console.log(values);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),

      password: Yup.string().required("Required")
    })}
    // validate = { values => {
    //   let errors = {};

    //   if (!values.email) {
    //     errors.email = "Required"
    //   }
    //   else if (!EmailValidator.validate(values.email)) {
    //     errors.email = "Invalid Email Address";
    //   }

    // const passwordRegex = /(?=.*[0-9])/;

    //   if (!values.password) {
    //     errors.password = "Required"
    //   }
    //   else if(values.password.lenght < 8) {
    //     errors.password = "Password must be 8 characters long."
    //   }
    //   else if (!passwordRegex.test(values.password)) {
    //     errors.password = "Invalid password. Must contain at least 1 number."
    //   }

    //   return errors;
    // }}
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
          <div className="login-box">
            <h1 className="title">P</h1>
            <h3 className="subtitle">Pustota</h3>
            <form onSubmit={handleSubmit}>
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
              <div style={{ display: "inline-block", width: "100%" }}>
                <input
                  id="rememberme"
                  className="checkbox"
                  type="checkbox"
                  name="rememberme"
                />
                <label htmlFor="rememberme" className="checkbox-container">
                  Remember me
                </label>
              </div>
              <input
                disabled={isSubmitting}
                type="submit"
                value="LOGIN"
                className="login-btn"
              />
            </form>
            <a style={{ float: "left" }} href="/Registration">
              Register
            </a>
            <a style={{ float: "right" }} href="#">
              Forgot your password?
            </a>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default AuthorizationPage;
