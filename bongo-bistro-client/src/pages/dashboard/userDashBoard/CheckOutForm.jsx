/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const Axios = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const { cartData } = useCart();
  const Navigate = useNavigate();
  const totalPrice = cartData.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      Axios.post("/api/bb/create-payment-intent", { price: totalPrice }).then(
        (res) => setClientSecret(res.data.clientSecret)
      );
    }
  }, [Axios, totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "annonymus",
            name: user.displayName || "annonymus",
          },
        },
      });
    if (cardConfirmError) {
      // setMessage(error.message);
      console.log("confirm error");
    } else {
      // setMessage("An unexpected error occurred.");
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        Swal.fire("Payment Successful");
        setTransectionId(paymentIntent.id);
        const paymentDetails = {
          name: user.profileName,
          email: user.email,
          price: totalPrice,
          data: new Date(),
          transectionId: paymentIntent.id,
          cartIds: cartData.map((item) => item._id),
          menuIds: cartData.map((item, index) => item.menuId || index + 1),
          status: "pending",
        };
        const res = Axios.post("/api/bb/payments", paymentDetails);
        Navigate("/dashboard/paymentHistory");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
