import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../../css/authNav.css";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      className="auth-nav"
    >
      <Navbar.Brand id="auth-nav-brand" href="/">
        Atlantis
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="ml-auto auth-nav-right-links">
          <Nav.Link style={{ fontSize: "16px", fontWeight: "400" }} href="/">
            Messages
          </Nav.Link>
          <Nav.Link style={{ fontSize: "16px", fontWeight: "400" }} href="/">
            Orders
          </Nav.Link>
          <a className="nav-link dropdown-toggle">
            <img
              src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <div className="auth_nav_side_menu">
              <Link to="/profile">
                <button>Profile</button>
              </Link>
              <br />
              <Link to="/settings">
                <button>Settings</button>
              </Link>
              <br />
              <button className="" href="#">
                <Nav.Link onClick={handleLogout} href="/">
                  Logout
                </Nav.Link>
              </button>
            </div>
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default AuthHeader;
