import React from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElement,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = (props) => {
  const { product } = props;
  const stripePromise = loadStripe(
    "pk_test_51HAVMjGmxAb4lhZbIIzRvweO3hnNyhgB5Tn2bn7mQeR11zM6zlnJBQuEk9CjdggmR0wa1oX3q4BZ3fnFItkrzQyx00CCxrLVV8"
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm product={product} />
    </Elements>
  );
};

Checkout.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Checkout);
