import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "../../css/guestNav.css";

const GuestHeader = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      className="guest-nav"
    >
      <Navbar.Brand id="auth-nav-brand" href="/">
        Atlantis
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="ml-auto guest-nav-links">
          <Nav.Link href="/">English</Nav.Link>
          <Nav.Link href="/login">Sign In</Nav.Link>
          <Form inline>
            <Button href="/register" variant="success">
              Join us
            </Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GuestHeader;
