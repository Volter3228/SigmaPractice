import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./authorization.css";

const AuthorizationPage = props => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      props.getTokenAsync(values);
   
      console.log("Submitting");
      console.log(values);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),

      password: Yup.string().required("Required")
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
              <input type="submit" value="LOGIN" className="login-btn" />
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
