import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./SearchResults.css";
import { Stack, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import FavoriteBorderIcon

function SearchResults() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  console.log(location.state);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${location.state}`
      );
      const result = await res.json();
      setData(result.products);
      console.log(result);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.state]);

  return (
    <>
      <div className="card">
        {data.length === 0 ? (
          <h3
            style={{
              color: "red",
              textAlign: "center",
              alignItems: "center",
              letterSpacing: "3px",
            }}
          >
            Data Not Found!
          </h3>
        ) : (
          data.map((product) => (
            <div className="card-item" key={product.id}>
              <h3>Product List</h3>
              <img src={product.thumbnail} alt="img" />
              <h3>{product.title}</h3>
              <p>{product.description.slice(0, 43)}</p>
              <h5>
                Rating{" "}
                <Rating
                  name="read-only"
                  value={Math.floor(product.rating)}
                  readOnly
                />
              </h5>
              <h5>Discount {Math.floor(product.discountPercentage)}%</h5>
              <h4>{product.price}</h4>
              <button
                className="btnh"
                onClick={() =>
                  navigate("/SingleProduct", { state: product.id })
                }
              >
                Buy Now
              </button>
              <button
                className="btnh"
                onClick={() => {
                  setOpen(true);
                }}
              >
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
          ))
        )}
      </div>
    </>
  );
}

export default SearchResults;
