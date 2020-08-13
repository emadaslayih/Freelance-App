import React, { useState, useEffect } from "react";
import Header from "../components/headers/Header";
import "../css/serviceScreen.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Image, Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import store from "../store";
import Checkout from "../components/Checkout";

const ServiceScreen = ({ match: { params } }) => {
  const { serviceName } = params;
  console.log(params);
  const [user, setUser] = useState();
  const [myService, setMyService] = useState();
  const authenticatedUser = store.getState().auth.user;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:9000/services/name/${serviceName}`
      );
      console.log(response.data);
      setMyService(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      if (myService) {
        const response = await axios.get(
          `http://localhost:9000/users/${myService.userID}`
        );
        console.log("myService", myService.userID);
        setUser(response.data);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        {myService ? (
          <Row>
            <Col style={{ paddingLeft: "0px" }}>
              <div className="serviceScreen-details">
                <h3 style={{ width: "26em", fontWeight: "650" }}>
                  {myService.name}
                </h3>
                {user ? (
                  <p style={{ color: "#6c757d", paddingLeft: "1em" }}>
                    {user.firstname} casd
                  </p>
                ) : (
                  <p>{user ? user.firstname : <p>noUser hjere </p>}</p>
                )}
                <Image
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "360px",
                  }}
                  src={`http://localhost:9000/${myService.serviceImage}`}
                />
                <Card.Text style={{ paddingTop: "10px" }}>
                  Rating :{" "}
                  <span style={{ color: "#ffc107" }}>{myService.rating}</span>
                </Card.Text>
                {authenticatedUser &&
                authenticatedUser._id === myService.userID ? (
                  <Link
                    className="card-block stretched-link text-decoration-none"
                    to={{
                      pathname: `/edit/${serviceName.split(" ").join("-")}`,
                    }}
                  >
                    <Button style={{ float: "right" }}>Edit</Button>
                  </Link>
                ) : (
                  <p>Cant edit this</p>
                )}

                <Card.Text>Price : {myService.price}$</Card.Text>
                <h4 style={{ margin: "20px 0" }}>About this Gig</h4>
                <p>{myService.description}</p>
              </div>
            </Col>

            <Col
              style={{
                marginLeft: "30em",
                color: "#6c757d",
              }}
            >
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link
                        style={{
                          color: "#6c757d",
                        }}
                      >
                        Payment
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    Summary
                  </Card.Title>
                  <Card.Text>Total : {myService.price}$</Card.Text>
                  <hr></hr>
                  <Checkout product={myService} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <h1>Loading ....</h1>
        )}
      </Container>
    </div>
  );
};
ServiceScreen.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ServiceScreen);
