import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-bootstrap";
import "../css/footer.css";

const Footer = () => {
  return (
    <div>
      <hr></hr>
      <Row>
        <Col className="Footer-left-col footer-all-col">
          <h5>Catefories</h5>
          <Link>Graphics&Design</Link>
          <Link>Digital&Marketing</Link>
          <Link>Writing & Translation</Link>
          <Link>Video & Animation</Link>
          <Link>Music & Audio</Link>
          <Link>Programming & Tech</Link>
          <Link>Business </Link>
          <Link>Lifestyle</Link>
          <Link>Sitemap</Link>
        </Col>
        <Col className="Footer-second-col footer-all-col">
          <h5>About</h5>
          <Link>Careers</Link>
          <Link>Press & News</Link>
          <Link>Partnerships</Link>
          <Link>Privacy Policy</Link>
          <Link>Terms of Service</Link>
          <Link>Intellectual Property Claims</Link>
          <Link>Investor Relations</Link>
        </Col>
        <Col className="Footer-third-col footer-all-col">
          <div className="suport-div">
            <h5>Support</h5>
            <Link>Help & Support</Link>
            <Link>Trust & Safetyn</Link>
            <Link>Selling on Fiverr</Link>
            <Link>Buying on Fiverr</Link>
          </div>
        </Col>
        <Col className="Footer-fourth-col footer-all-col">
          <h5>Community</h5>
          <Link>Events</Link>
          <Link>Blog</Link>
          <Link>Forum</Link>
          <Link>Community Standards</Link>
          <Link>Podcast</Link>
          <Link>Affiliates</Link>
          <Link>Invite a Friend</Link>
          <Link>Become a Seller</Link>
          <Link>Fiverr Elevate</Link>
        </Col>
        <Col className="Footer-right-col footer-all-col">
          <h5>More From Fiverr</h5>
          <Link>Fiverr Pro</Link>
          <Link>Fiverr Studios</Link>
          <Link>Fiver Logo Marker</Link>
          <Link>Fiverr Guides</Link>
          <Link>Get Inspired</Link>
          <Link>Clear Voice</Link>
          <Link>And Co</Link>
          <Link>Learn</Link>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <h3>Fiverr</h3>
          <i class="fab fa-twitter-square"></i>
        </Col>
      </Row>
      <div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </div>
    </div>
  );
};
export default Footer;
