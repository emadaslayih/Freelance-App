import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import axios from "axios";
import store from "../../store";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/carousel.css";

import First from "../../uploads/ben-white.jpg";
import Second from "../../uploads/neonbrand.jpg";
import Third from "../../uploads/alesia-kazantceva.jpg";
import Fourth from "../../uploads/emile-perron.jpg";

const CarouselBanner = (props) => {
  const user = store.getState().auth.user;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ marginLeft: "1em", marginBottom: "3em" }}>
      <Row>
        <Col
          lg={3}
          sm={3}
          md={3}
          xs={3}
          style={{
            backgroundColor: "#fafafa",
            textAlign: "center",
            paddingTop: "3em",
            paddingBottom: "1em",
          }}
        >
          {user ? (
            <p style={{ fontSize: "1.5em" }}>Hi {user.firstname} </p>
          ) : (
            <p style={{ fontSize: "1.5em" }}>Hi there</p>
          )}

          <p>Get offers from sellers</p>
          <p>for your project</p>
          <Button variant="info" href="/create">
            Post a request
          </Button>
        </Col>
        <Col lg={9} sm={9} md={9} xs={9}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img height="300" src={First} alt="Influencer" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Grow your influencer channel</h3>
                <p>Handpicked services to help you maximize your earnings.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img height="300" src={Second} alt="Brand" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Build a better brand</h3>
                <p>Create a brand that demands attention with this guide.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img height="300" src={Third} alt="Gaming" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Atlantis's gaming store</h3>
                <p>Design,development,animation and more.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img height="300" src={Fourth} alt="Learn" />
              <Carousel.Caption className="homepage_carousel_text">
                <h3>Learn something new today</h3>
                <p>
                  Online professional courses, led by the world's leading
                  experts.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

CarouselBanner.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(CarouselBanner);
