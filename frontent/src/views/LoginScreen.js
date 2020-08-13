import React, { Fragment, useState } from "react";
import "../css/loginScreen.css";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../redux/auth/thunks";

const LoginScreen = ({ login, isAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-content">
            <Link to="/" id="login-brand">
              Atlantis
            </Link>
            <div className="headline-content">
              <h1 id="content-title">Get exclusive jobs to Atlantis</h1>
              <p>
                We are in the proccess of developing our online platform, where
                we aim to make the concept as user-friendly as possible. We
                therefore send out jobs continuously, focusing on the good
                customer contact.
              </p>
            </div>
          </div>
          <div className="login-window">
            <div className="create-profile-div">
              <Link to="/register">Don't have an account ?</Link>
              <Button href="/register" id="create-button">
                Create Profile
              </Button>
            </div>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                name="email"
                type="email"
                onChange={onChange}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
                placeholder="Email"
                autoComplete="off"
              />
              {errors.email && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginRight: "43%",
                  }}
                >
                  Invalid email address
                </p>
              )}

              <input
                name="password"
                type="password"
                onChange={onChange}
                ref={register({ required: true, minLength: 8 })}
                placeholder="Password"
              />
              {errors.password && errors.password.type === "required" && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginRight: "47%",
                  }}
                >
                  This is required
                </p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginBottom: "0",
                    marginRight: "47%",
                  }}
                >
                  Min length of 8
                </p>
              )}
              <Button formNoValidate="true" type="submit" id="login-button">
                Log in
              </Button>
              <Link>Forgot Password ?</Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginScreen);
