import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/createService.css";
import Header from "../components/headers/Header";

import store from "../store";

const CreateServiceScreen = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const { form, handleSubmit, errors } = useForm();
  const user = store.getState();

  const [categoryName, handleCategoryName] = useState("");
  const [service, setService] = useState({
    name: "",
    description: "",
    rating: 0,
    price: "",
    serviceImage: null,
    subCategory: "",
  });

  const onSubmit = (e) => {
    // axios
    //   .post("http://localhost:9000/services/create", service)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const onChange = (e) => {
    e.persist();
    setService({ ...service, [e.target.name]: e.target.value });
    console.log(service);
  };
  
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setService({ ...service, serviceImage: file });
  };

  const onChange2 = (e) => {
    e.persist();
    handleCategoryName(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:9000/categories");
      setCategories(response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:9000/categories/name/${categoryName
          .split(" ")
          .join("-")}`
      );
      console.log("my response :", response.data);
      setSubCategories(response.data.subcategories);
    }

    fetchData();
  }, [categoryName]);

  return (
    <div>
      <Header />
      <Container
        className="service_register"
        style={{ border: "0.5px solid #cccccc" }}
      >
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="service_title">
                <Form.Label>POST YOUR GIG</Form.Label>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  NAME:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="name"
                    autoComplete="off"
                    value={service.name}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  DESCRIPTION:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="textarea"
                    autoComplete="off"
                    name="description"
                    value={service.description}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  CATEGORY:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    name="category"
                    as="select"
                    onChange={onChange2}
                  >
                    {categories.map((category) => (
                      <option>{category.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm={4}>
                  <Form.Control
                    onChange={onChange}
                    name="subCategory"
                    as="select"
                  >
                    {subCategories.length &&
                      subCategories.map((subCategory, key) => (
                        <option key={subCategory._id}>
                          {subCategory.name}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  PRICE:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="price"
                    autoComplete="off"
                    value={service.price}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  PHOTO:
                </Form.Label>
                <Col sm={8}>
                  <Form.File
                    name="serviceImage"
                    autoComplete="off"
                    onChange={onFileChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="service_form">
                <Col sm={12}>
                  <Button type="submit">POST</Button>
                </Col>
              </Form.Group>
              {service.serviceImage ? (
                <div className="row mt-5">
                  {" "}
                  <div className="col-md-6 m-auto">
                    <img
                      style={{ width: "100%" }}
                      src={service.serviceImage.filePath}
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <h1></h1>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CreateServiceScreen.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(CreateServiceScreen);
