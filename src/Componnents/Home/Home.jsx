import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Stack, Snackbar, Alert } from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [open, setOpen] = useState(false);

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

  const fetchData = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=100`);
      const result = await res.json();
      setData(result.products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData2 = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const result = await res.json();
      setData2(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();  
    fetchData2();
  }, []);

  // Define a Material-UI theme

  return (
    <>
      <Navbar />
      <h3>Product List</h3>
      <div className="card">
        {data.map((product) => (
          <div className="card-item" key={product.id}>
            <img
              src={product.thumbnail}
              alt="img"
              onClick={() => navigate("/SingleProduct", { state: product.id })}
            ></img>
            <h3 style={{fontSize:"1rem",fontWeight:"bold", marginTop:"3%"}}>{product.title}</h3>
            <p>{product.description.slice(0, 43)}</p>
            <h5 style={{display:"flex",alignItems:"center", fontSize:"0.8rem"}}>
             <span>Rating</span>
              <Rating
                style={{fontSize:"0.8rem"}}
                name="read-only"
                value={Math.floor(product.rating)}
                readOnly
              />
            </h5>
            <h5 style={{fontSize:"0.8rem"}}>Discount {Math.floor(product.discountPercentage)}%</h5>
            <h4 style={{fontSize:"0.9rem"}}>{product.price}</h4>
            <button
              className="btnh"
              onClick={() => navigate("/SingleProduct", { state: product.id })}
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
        ))}
      </div>
    </>
  );
}

export default Home;
