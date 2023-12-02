import React, { createContext, useState, useEffect } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";

const SearchResult = createContext();

function Navbar() {
  const [CategoryData, SetCategoryData] = useState([]);
  const [SearchData, setSearchData] = useState("");
  const [categories, SetCategory] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const result = await res.json();
      SetCategoryData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SearchResult.Provider value={SearchData}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                className="image"
                style={{ height: "8vh", width: "80%" }}
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjy7aGb66Wj5fXC6-daRd9MP167wwWlxkm82Zito5-YIkIIScGLbPnNVFAp_OaEsu-TGjW3-quI_5JeEniu_ZuNV1KEXoPUIYPIUwl1vf1uQZ4Q8fD_awibNvslx1tt6dFoAsObyVkCSMKf1ZADacwwsaLe2C67VzPwikijJkYC9sxYNkA1jWVVoASK1ajp/s500/61f7cd6e67553f0004c53e73.png"
                alt="Logo"
              />
            </a>
            <Button
              className="navbar-toggler .text-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                style={{ fontSize: "1.2rem" }}
                className="navbar-toggler-icon "
              ></span>
            </Button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    style={{cursor:"pointer"}}

                    onClick={() => {
                      navigate("/CategoriesSerch", { state: "mens-shirts" });
                    }}
                  >
                    Mens
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    style={{cursor:"pointer"}}
                    onClick={() => {
                      navigate("/CategoriesSerch", { state: "womens-dresses" });
                    }}
                  >
                    Womens
                  </a>
                </li>
                <li
                  className="nav-item dropdown"
                  style={{ fontWeight: "bolder" }}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </a>

                  <ul className="dropdown-menu" style={{ width: "300px" }}>
                    {CategoryData.map((data) => (
                      <li
                        id="category-item"
                        style={{
                          marginLeft: "12px",
                          letterSpacing: "1px",
                          marginTop: "10px",
                          padding: "5px",
                          cursor: "pointer",
                          marginRight: "12px",
                        }}
                        target="blank"
                        key={data}
                        onClick={() =>
                          navigate(`/CategoriesSerch`, { state: data })
                        }
                      >
                        {data.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <form className="d-flex formtag" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearchData(e.target.value)}
                />
                <br />
                <Button
                  className="btn btn-outline-success"
                  type="submit"
                  style={{ color: "white",cursor:"pointer",backgroundColor:"brown" }}
                  onClick={() => {
                    navigate("/ShearchResults", { state: SearchData });
                  }}
                >
                  Search
                </Button>
              </form>
              <div className="nav-icons">
                <PersonOutlineIcon className="icon"  onClick={()=>{
                  alert("Dont Click its Dummy Icon")
                }} />
                &nbsp; &nbsp;
                <FavoriteBorderIcon className="icon" onClick={()=>{
                  alert("Dont Click its Dummy Icon")
                }}  />
                &nbsp; &nbsp;
                <ShoppingCartIcon className="icon"  onClick={()=>{
                  alert("Dont Click its Dummy Icon")
                }} />
              </div>
            </div>
          </div>
        </nav>
      </SearchResult.Provider>
    </>
  );
}

export default Navbar;
export { SearchResult }; // Export with the corrected variable name
