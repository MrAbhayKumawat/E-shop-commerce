import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import FavoriteBorderIcon
import "./SingleProduct.css";
import { Stack, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SingleProduct() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false); // Move this line inside the component function
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/" + location.state
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.state]);

  return (
    <>
      <h2>Product Details</h2>
      <div className="Spro-card">
        <div className="card-item-single" key={data.id}>
          <img src={data.thumbnail} alt="img" className="SinglePro-image"></img>
          <div className="pro-details">
            <h3 style={{ fontSize: "2.5rem" }}>{data.title}</h3>
            <p>{data.description}</p>
            <h5>
              Rating
              <Rating
                name="read-only"
                value={Math.floor(data.rating)}
                readOnly
              />
            </h5>
            <h5>Discount {Math.floor(data.discountPercentage)}%</h5>
            <h4>{data.price}</h4>
            <button
              className="Singlepage-Btn"
              onClick={() => {
                navigate("/ConatactDetails", {
                  state: {
                    id: data.id,
                    ProductName: data.title,
                    price: data.price,
                    dis: data.description,
                    discount: Math.floor(data.discountPercentage),
                  },
                });
              }}
            >
              Buy Now
            </button>
            <button className="Singlepage-Btn" onClick={handleClick}>
              <FavoriteBorderIcon /> WISHLIST
            </button>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  style={{ backgroundColor: "green", color: "white" }}
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  YOUR ITEM IS WISHLISTED SUCCESSFULLY!{" "}
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
