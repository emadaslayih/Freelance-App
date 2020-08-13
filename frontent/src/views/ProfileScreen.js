import React, { useState, useEffect } from "react";
import Header from "../components/headers/Header";
import { Card, Button, Image, Row, Col, Container } from "react-bootstrap";
import ServiceItem from "../components/ServiceItem";
import "../css/profileScreen.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import store from "../store";
import Spinner from "../components/spinner/Spinner";

const ProfileScreen = () => {
  const [services, setServices] = useState();

  const user = store.getState().auth.user;

  console.log("user : ", user);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:9000/services`);
      setServices(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {user ? (
        <Row>
          <Col style={{ paddingRight: 0 }}>
            <Card
              style={{
                width: "25rem",
                height: "29rem",
                margin: "1.5em 6em",
                textAlign: "center",
              }}
            >
              <Image
                style={{
                  width: "40%",
                  objectFit: "cover",
                  height: "35%",
                  margin: "1em 7.7em",
                }}
                roundedCircle
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              />
              <Card.Body>
                <Card.Title>
                  {user.firstname} {user.lastname}
                </Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Button
                  style={{ border: "0.5px solid #ccc", width: "20em" }}
                  variant="gray"
                >
                  Preview public mode
                </Button>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "25rem",
                height: "25rem",
                margin: "1.5em 6em",
                marginRight: "0px",
                textAlign: "left",
              }}
            >
              <Card.Header as="h5">About</Card.Header>
              <Card.Body>
                <Card.Text>
                  I am the {user.firstname} , I come from the ocean itself and
                  my son is Aquaman .He possesses superhuman strength and the
                  ability to manipulate the tides, communicate with sea
                  creatures and swim at supersonic speeds.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ paddingLeft: "0" }} xs={4} md={7}>
            <Container>
              <Row>
                {services &&
                  user &&
                  services
                    .filter((service) => service.userID === user._id)
                    .map((service, index) => (
                      <ServiceItem
                        key={index}
                        _id={service._id}
                        name={service.name}
                        serviceImage={service.serviceImage}
                        description={service.description}
                        price={service.price}
                        rating={service.rating}
                      />
                    ))}
              </Row>
            </Container>
          </Col>
        </Row>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

ProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(ProfileScreen);
