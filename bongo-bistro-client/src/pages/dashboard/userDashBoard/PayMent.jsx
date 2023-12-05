/* eslint-disable no-unused-vars */
import React from "react";
import Heading from "../../../components/shared/Heading";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const PayMent = () => {
  return (
    <div>
      <Heading mainTitle={"PayMent"} subTitle={"payment with strip"} />
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PayMent;
