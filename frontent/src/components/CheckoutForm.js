import React from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import store from "../store";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CheckoutForm = (props) => {
  const { product } = props;
  console.log("product in form", product);
  const stripe = useStripe();
  const elements = useElements();

  const authenticatedUser = store.getState().auth.user;
  console.log(authenticatedUser);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:9000/payments", {
          id,
          amount: product.price * 100,
          name: product.name,
          user: authenticatedUser.firstname + " " + authenticatedUser.lastname,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "300px",
        margin: "0 auto",
        display: "grid",
      }}
    >
      <CardElement />
      <Button
        style={{ margin: "20px 0px 10px 10px" }}
        type="submit"
        disabled={!stripe}
        variant="success"
      >
        Order now
      </Button>
    </form>
  );
};

CheckoutForm.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(CheckoutForm);
