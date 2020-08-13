import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import "../css/editServiceScreen.css";
import Header from "../components/headers/Header";

const EditServiceScreen = ({ match: { params } }) => {
  const { serviceName } = params;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const { form, handleSubmit, errors } = useForm();
  const [categoryName, handleCategoryName] = useState("");
  const [myService, setMyService] = useState({});
  const [service, setService] = useState({
    name: "",
    description: "",
    rating: 0,
    price: "",
    serviceImage: "",
    subCategory: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:9000/services/name/${serviceName}`
      );
      setMyService(response.data);
      console.log(myService);
    }

    fetchData();
  }, []);

  const onSubmit = (e) => {
    /*const data = { title:service.name,price:service.name,price:service.price,photo:service.serviceImage,subCategoryID: subCategory._id };  
         axios.post(apiUrl, data)  
         .then((result) => {  
            props.history.push('/service')});  */

    alert(service.subCategory);
    // axios
    //   .patch(`http://localhost:9000/services/${service.name}`, service)
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

  console.log("my subcategories: ", subCategories);
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
                <Form.Label>Update YOUR SERVICE</Form.Label>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  NAME:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="name"
                    autoComplete="off"
                    defaultValue={myService.name}
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
                    defaultValue={myService.description}
                    onChange={onChange}
                  />
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
                    defaultValue={myService.price}
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
                    defaultValue={myService.serviceImage}
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

              <Form.Group className="service_form">
                <Col sm={12}>
                  <Button type="submit">Update</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditServiceScreen;
