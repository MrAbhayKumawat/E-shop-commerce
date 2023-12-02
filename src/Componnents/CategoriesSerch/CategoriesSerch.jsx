import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Stack, Snackbar, Alert } from "@mui/material";
import "./CategoriesSerch.css";

function CategoriesSearch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${location.state}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.state]);

  return (
    <>
      <div className="card">
        {data.map((product) => (
          <div className="card-item" key={product.id}>
            <img src={product.thumbnail} alt="img" />
            <h3>{product.title}</h3>
            <p>{product.description.slice(0, 43)}</p>
            <h5>
              Rating
              <Rating
                name="read-only"
                value={product.rating} // Use the actual rating value
                readOnly
              />
            </h5>
            <h5>Discount {Math.floor(product.discountPercentage)}%</h5>
            <h4>{product.price}</h4>
            <button
              className="btnh"
              onClick={() => navigate("/SingleProduct", { state: product.id })}
            >
              Buy Now
            </button>
            <button className="btnh" onClick={handleClick}>
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
                  YOUR ITEM IS WISHLISTED SUCCESSFULLY!
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesSearch;
