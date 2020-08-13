import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/subheaderStyle.css";

const SubHeader = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:9000/categories");
      setCategories(response.data);
    }

    fetchData();
  }, []);

  return (
    <Navbar collapseOnSelect className="sub_navbar" expand="lg" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {categories.map((category, index) => (
          // <Nav className="mr-auto" id="sub_dropdown" renderMenuOnMount={true}>
          <Nav key={index} className="mr-auto" id="sub_dropdown">
            <NavDropdown.Header className="sub_dropdown_title">
              <Link
                to={{
                  pathname: `/categories/${category.name.split(" ").join("-")}`,
                }}
              >
                {category.name}
              </Link>
            </NavDropdown.Header>
            <div className="sub_dropdown_menu">
              {category.subcategories &&
                category.subcategories.map((subCategory, index) => (
                  <NavDropdown.Item key={index} className="sub_item">
                    <Link
                      to={{
                        pathname: `/${category.name
                          .split(" ")
                          .join("-")}/${subCategory.name.split(" ").join("-")}`,
                      }}
                    >
                      {subCategory.name}
                    </Link>
                  </NavDropdown.Item>
                ))}
            </div>
          </Nav>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SubHeader;
