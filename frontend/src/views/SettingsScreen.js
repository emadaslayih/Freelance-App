import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Header from "../components/headers/Header";
import "../css/settings.css";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../redux/auth/thunks";
import { Link } from "react-router-dom";
import store from "../store";
import Spinner from "../components/spinner/Spinner";
import bcrypt from "bcryptjs";

const SettingsScreen = ({ updateUser }) => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    password: "",
  });

  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPw = bcrypt.hash(password, salt).then();
    console.log(hashedPw);
    return hashPassword;
  };

  console.log("my form data : ", formData.password);
  const user = store.getState().auth.user;

  const handleClick = async (e) => {
    setFormData({ ...formData, password: hashPassword(formData.password) });
    updateUser(user._id, formData);
    window.location.reload();
  };

  return (
    <Fragment>
      <Header />
      {user ? (
        <section className="settings-section">
          <div className="first-div-inside-section">
            <aside className="settings-aside">
              <h5>Account</h5>
            </aside>
            <article className="settings-article">
              <form
                onSubmit={handleSubmit(handleClick)}
                className="settings-update-form"
              >
                <div className="settings-go-to-profile">
                  <label>Need to update your profile ?</label>
                  <Link className="settings-go-profile-link">
                    {" "}
                    Go to my Profile
                  </Link>
                </div>
                <hr></hr>

                <div className="form-row">
                  <div className="label-wrap">
                    <label>First and Last Name</label>
                  </div>
                  <div className="settings-user-name">
                    <input
                      type="text"
                      name="firstname"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      defaultValue={user.firstname}
                    ></input>
                    <input
                      type="text"
                      name="lastname"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      defaultValue={user.lastname}
                    ></input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-wrap">
                    <label>Email</label>
                  </div>
                  <div className="settings-user-email">
                    <input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="email"
                      defaultValue={user.email}
                    ></input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-wrap">
                    <label>Address</label>
                  </div>
                  <div className="settings-user-address">
                    <input
                      type="text"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="address"
                      defaultValue={user.address}
                    ></input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="label-wrap">
                    <label>Password</label>
                  </div>
                  <div className="settings-user-password">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      defaultValue={user.password}
                    ></input>
                  </div>
                </div>

                <div className="settings-saveChanges-button">
                  <Button type="submit" variant="success">
                    Save Changes
                  </Button>{" "}
                </div>
              </form>
              <hr></hr>
              <div className="form-row">
                <div className="label-wrap">
                  <label>Account Deactivation</label>
                </div>
                <div className="settings-deactivation-account">
                  <label>What happens when you deactivate your account</label>
                  <ul>
                    <li>
                      Your profile and Gigs won't be shown on Fiverr anymore.
                    </li>
                    <li>You won't be able to re-activate your Gigs</li>
                  </ul>
                </div>
              </div>
              <div className="form-row">
                <div className="label-wrap">
                  <label>Im leaving because ...</label>
                </div>
                <div className="settings-user-email">
                  <select className="secondform-select">
                    <option>Choose a reason</option>
                    <optgroup label="Account"></optgroup>
                    <option>Unsubscribe from Fiverr</option>
                    <option>I want to change my username</option>
                    <option>I Have another Fiverr account</option>
                    <option>Other</option>
                    <optgroup label="Buiyng"></optgroup>
                    <option>I can't find what I need on Fiverr</option>
                    <option>Fiverr is compicated or hard to use</option>
                    <option>Negative experince with seller's</option>
                    <option>I'm unhappy with Fiverrs policies</option>
                    <option>Other</option>
                    <option>Something else</option>
                  </select>
                </div>
              </div>
              <div className="settings-saveChanges-button">
                <Button variant="secondary">Deactivate Account</Button>{" "}
              </div>
            </article>
          </div>
        </section>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

SettingsScreen.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateUser })(SettingsScreen);
