import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../css/serviceItem.css";
import { Link } from "react-router-dom";

const ServiceItem = (props) => {
  const [service, setService] = useState({
    _id: props._id,
    description: props.description,
    name: props.name,
    price: props.price,
    rating: props.rating,
    serviceImage: props.serviceImage,
  });

  return (
    <Card
      className="serviceItem-card"
      style={{
        width: "18rem",
        marginLeft: "4em",
        marginBottom: "2em",
        paddingBottom: "0em",
      }}
    >
      <Link
        class="card-block stretched-link text-decoration-none"
        to={{
          pathname: `/service/${service.name.split(" ").join("-")}`,
        }}
      >
        <Card.Body
          className="serviceItem-cardBody"
          style={{ padding: "0.3em" }}
        >
          <Card.Img src={`http://localhost:9000/${props.serviceImage}`} />
          <Card.Title style={{ height: "48px", marginBottom: "0px" }}>
            {props.name}
          </Card.Title>
          <Card.Text
            style={{
              paddingTop: "0.3em",
              height: "50px",
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
              OTextOverflow: "ellipsis",
              textOverflow: "ellipsis",
              marginBottom: "0px",
            }}
          >
            {props.description}
          </Card.Text>
          <Card.Text
            style={{
              color: "#ffbf00",
              fontWeight: "800",
              marginBottom: "0.11em",
            }}
          >
            {props.rating}
          </Card.Text>
          <Card.Text> {props.price}$</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ServiceItem;
