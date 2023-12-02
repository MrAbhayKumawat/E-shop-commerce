import React, { useEffect } from "react";
import "./OrderPlaced.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function OrderPlaced() {
  const navigate = useNavigate();
  const location = useLocation();
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const fulldate = date + 3 + "-" + month + "-" + year;

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvv8nhe3f4tazSjgkhmf2I1s7Ri8JZCYEjKDtMOD9RD_ZLTur0pi0SsgBaQiAXQFi4PVY&usqp=CAU"
          // style={{ height: "35vh", width: "25%" }}
        ></img>
      </div>
      <div style={{ textAlign: "center", color: "green" }}>
        <h1>Your order Placed successfully!</h1>
        <h3 style={{ textAlign: "center", color: "black" }}>
          Your Order ID is :{" "}
          <span style={{ color: "green" }}>{location.state}</span>
        </h3>
        <h3 style={{ textAlign: "center", color: "black" }}>
          Expected Date : <span style={{ color: "green" }}>{fulldate}</span>
        </h3>
      </div>
    </>
  );
}

export default OrderPlaced;
