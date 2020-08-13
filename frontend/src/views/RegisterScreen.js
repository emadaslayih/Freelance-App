import React, { useState } from "react";
import "../css/registerScreen.css";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { registerUser } from "../redux/auth/thunks";
import { Link, Redirect } from "react-router-dom";

const RegisterScreen = ({ registerUser, isAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    password: "",
    password2: "",
  });

  const { firstname, lastname, address, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    if (password !== password2) {
    } else {
      registerUser({ firstname, lastname, email, address, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-window">
          <Link to="/" id="register-brand">
            Atlantis
          </Link>
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="firstname"
              ref={register({ required: true, minLength: 2 })}
              type="text"
              onChange={onChange}
              placeholder="First Name"
              autoComplete="off"
            />
            {errors.firstname && errors.firstname.type === "required" && (
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
            {errors.firstname && errors.firstname.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 2
              </p>
            )}

            <input
              name="lastname"
              type="text"
              onChange={onChange}
              ref={register({ required: true, minLength: 2 })}
              placeholder="Last Name"
              autoComplete="off"
            />
            {errors.lastname && errors.lastname.type === "required" && (
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
            {errors.lastname && errors.lastname.type === "minLength" && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "47%",
                }}
              >
                Min length of 2
              </p>
            )}

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
              name="address"
              type="text"
              onChange={onChange}
              ref={register({ required: true, minLength: 2 })}
              placeholder="Address"
              autoComplete="off"
            />

            {errors.address && errors.address.type === "required" && (
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
            {errors.address && errors.address.type === "minLength" && (
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

            <input
              name="password"
              onChange={onChange}
              type="password"
              ref={register({
                required: true,
                minLength: 8,
              })}
              placeholder="Password"
              autoComplete="off"
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

            <input
              name="password2"
              onChange={onChange}
              type="password"
              ref={register({ required: true, minLength: 8 })}
              placeholder="Confirm Password"
            />

            {errors.password2 && errors.password2.type === "required" && (
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
            {errors.password2 && errors.password2.type === "minLength" && (
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

            {password !== password2 && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginBottom: "0",
                  marginRight: "41%",
                }}
              >
                Password doesnt match
              </p>
            )}
            <Button formNoValidate="true" type="submit" id="register-button">
              Register Now!
            </Button>
          </form>
        </div>
        <div className="register-content">
          <div className="register-headline-content">
            <h1 id="register-content-title">
              Let's find you the perfect digital job
            </h1>
            <p>
              Create your Digital Profile to start seeing suggested jobs based
              on your skills. Your profile is private and you use it to apply
              for jobs with one click.
            </p>
          </div>
          <Link>Already got an account ?</Link>
          <Button
            href="/login"
            formNoValidate="true"
            type="submit"
            id="content-login-button"
          >
            Login Now!
          </Button>
        </div>
      </div>
    </div>
  );
};
RegisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(RegisterScreen);
