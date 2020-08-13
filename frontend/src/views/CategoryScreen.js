import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/category.css";
import Header from "../components/headers/Header";
import { Container, Card, Row } from "react-bootstrap";
import axios from "axios";
import Spinner from "../components/spinner/Spinner";

const CategoryScreen = ({ match: { params } }) => {
  const { categoryName } = params;

  const [myCategory, setMyCategory] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:9000/categories/name/${categoryName}`
      );
      setMyCategory(response.data);
    }
    fetchData();
  }, [categoryName]);

  return (
    <div>
      <Header />
      <div className="category-info">
        {myCategory ? (
          <div>
            <h1>{myCategory.name}</h1>
            <p>{myCategory.description}</p>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <div className="category-wrapper">
        <div className="cat-subcategoryList">
          <ul>
            {myCategory !== undefined
              ? myCategory.subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <Link
                      to={{ pathname: `/subcategories/${subcategory.name}` }}
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))
              : console.log(" underfinedddd : ", myCategory)}
          </ul>
        </div>
        <div style={{ flexGrow: "8" }} className="cat-subcategory-cards">
          <Container>
            <Row>
              {myCategory !== undefined
                ? myCategory.subcategories.map((subcategory, index) => (
                    <Card
                      key={index}
                      style={{
                        width: "19em",
                        marginBottom: "2.8em",
                        marginRight: "1.3em",
                        border: "none",
                        borderRadius: "50px",
                      }}
                    >
                      <Card.Body style={{ padding: "0" }}>
                        <Card.Img src="https://fiverr-res.cloudinary.com/w_iw_div_3.0,q_auto,f_auto/general_assets/categories/assets/f3/desktop_graphic_and_design_creative_logo_design_high_quality.jpg" />
                        <Card.Text style={{ paddingTop: "0.5em" }}>
                          {subcategory.name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                : console.log(" my category is  : ", myCategory)}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default CategoryScreen;
