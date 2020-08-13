import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import { Container, Row } from "react-bootstrap";
import ServiceItem from "../components/ServiceItem";
import axios from "axios";
import Pagination from "../components/Pagination";
import CarouselBanner from "../components/headers/CarouselBanner";
import Footer from "../components/Footer";

const HomeScreen = (props) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await axios.get("http://localhost:9000/services");
      setServices(response.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = services.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return isLoading ? (
    <Header />
  ) : (
    <div>
      <Header />
      <CarouselBanner />
      <Container>
        <Row>
          {currentPosts.map((service, index) => (
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

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={services.length}
          paginate={paginate}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default HomeScreen;
