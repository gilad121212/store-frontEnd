import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import "./PayPal.css";

const CLIENT_ID =  "AWuutuwcDjV1bKKKixdtA9LkXEw8tSNoUjQXpOBIJlqutaGdLakuH-Q0_HXQQuRbegsOrE1ae78yK8Ik"


const Checkout = ({ amount }) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      console.log("Order successful. Your order id is--", orderID);
      const myHeaders = new Headers();
      const userFromStorage = JSON.parse(localStorage.getItem("user"));
      myHeaders.append("x-auth-token", userFromStorage.user[0]);
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        email: userFromStorage.user[1]
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`https://server-solve-google-forms.onrender.com/api/checkOrder/${orderID}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
        navigate("/");
    }
  }, [success, orderID]);
  

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div>
        <div className="wrapper"></div>
        <br></br>
        {
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        }
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
