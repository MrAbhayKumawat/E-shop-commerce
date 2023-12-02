import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./ConatactDetails.css";
function ContactDetails() {
    const location = useLocation();
    const navigate  = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pinCode: "",
    address: "",
    location: "",
    city: "",
    state: "",
    saveAs: "home",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleOptionChange = (event) => {
    setFormData({ ...formData, saveAs: event.target.value });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (formData.mobile.trim() === "") {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (formData.pinCode.trim() === "") {
      newErrors.pinCode = "Pin Code is required";
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    }

    if (formData.location.trim() === "") {
      newErrors.location = "Location/Town is required";
    }

    if (formData.city.trim() === "") {
      newErrors.city = "City/District is required";
    }

    if (formData.state.trim() === "") {
      newErrors.state = "State is required";
    }

      if (Object.keys(newErrors).length === 0) {
        navigate("/OrderPlaced",{state:location.state.id})

      console.log("Form data submitted:", formData);
      fetch(
        "https://e-shop-website-bead0-default-rtdb.firebaseio.com/e-shop-website.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify(formData),
            
          
          }
        
        ).catch((e) => console.error("Error fetch"));
    } else {
        setErrors(newErrors);
    }
    setFormData({
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        location: "",
        city: "",
        state: "",
        saveAs: "home",
    });
  };

  return (
    <>
      <div className="container">
        <div className="contact-details">
          <p>CONTACT DETAILS</p>
          <div className="Name-Mobile">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <div
                className="error"
                style={{ color: "red", textAlign: "start", paddingLeft: "4%" }}
              >
                {errors.name}
              </div>
            )}
            <br />
            <br />
            <input
              type="number"
              name="mobile"
              maxLength="10"
              placeholder="Mobile No*"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            {errors.mobile && (
              <div
                className="error"
                style={{ color: "red", textAlign: "start", paddingLeft: "4%" }}
              >
                {errors.mobile}
              </div>
            )}
          </div>
          <p style={{ paddingLeft: "2%", marginTop: "5%" }}>ADDRESS</p>
          <div>
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code*"
              value={formData.pinCode}
              onChange={handleInputChange}
            />
            {errors.pinCode && (
              <div
                className="error"
                style={{ color: "red", textAlign: "start", paddingLeft: "4%" }}
              >
                {errors.pinCode}
              </div>
            )}
            <br />
            <br />
            <input
              type="text"
              name="address"
              placeholder="Adddress (House No,Buildiing,Street,Area)*"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <div
                className="error"
                style={{ color: "red", textAlign: "start", paddingLeft: "4%" }}
              >
                {errors.address}
              </div>
            )}
            <br />
            <br />
            <input
              type="text"
              name="location"
              placeholder="Location/Town*"
              value={formData.location}
              onChange={handleInputChange}
            />
            {errors.location && (
              <div
                className="error"
                style={{ color: "red", textAlign: "start", paddingLeft: "4%" }}
              >
                {errors.location}
              </div>
            )}
            <br />
            <br />
            <input
              type="text"
              name="city"
              className="City-state"
              placeholder="City / District*"
              value={formData.city}
              onChange={handleInputChange}
            />
            &nbsp; &nbsp; &nbsp;
            <input
              type="text"
              name="state"
              className="City-state"
              placeholder="State*"
              value={formData.state}
              onChange={handleInputChange}
            />
            <div style={{ display: "flex", gap: "10%" }}>
              {errors.city && (
                <div
                  className="error"
                  style={{
                    color: "red",
                    textAlign: "start",
                    paddingLeft: "4%",
                  }}
                >
                  {errors.city}
                </div>
              )}
              {errors.state && (
                <div
                  className="error"
                  style={{
                    color: "red",
                    textAlign: "start",
                    paddingLeft: "4%",
                  }}
                >
                  {errors.state}
                </div>
              )}
            </div>
            <br />
          </div>
          <div className="SAVE-ADDRESS-AS">
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                SAVE ADDRESS AS
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={formData.saveAs}
                onChange={handleOptionChange}
              >
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="office"
                  control={<Radio />}
                  label="Office"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <button className="C-Btn" onClick={handleSubmit}>
              Add Address & Continue
            </button>
          </div>
        </div>
        <div className="Price-details">
          <p>PRICE DETAILS</p>
          <div className="price-data">
            <div>
              <p>Total MRP</p>
              <p style={{ width: "100%" }}>Discount on MRP</p>
            </div>
            <div>
              <p style={{ width: "100%" }}>
                <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
                {location.state.price}
              </p>
              <p style={{ width: "100%", color: "#03A685" }}>
                <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
                {(location.state.price / 100) * location.state.discount}
              </p>
            </div>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ width: "100%" }}> Total Amount</p>
            </div>
            <div>
              <p style={{ width: "100%" }}>
                <CurrencyRupeeIcon style={{ fontSize: "18px" }} />{" "}
                {location.state.price -
                  (location.state.price / 100) * location.state.discount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
