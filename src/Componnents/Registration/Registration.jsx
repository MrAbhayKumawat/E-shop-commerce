import React from "react";
import { useState } from "react";
import "./Registration.css";
import { TextField, Button } from "@mui/material";
function Registration() {
  const [Username, setUsername] = useState();
  const [email, setemail] = useState();
  const handlsubmit = async (event) => {
    event.preventDefault();
    let reobj = { Username, email };

    const res = await fetch(
      "https://e-shop-website-bead0-default-rtdb.firebaseio.com/e-shop-website.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reobj),
      }
    ).catch((e) => console.error("Error fetch"));

    if (Username && email) {
      alert("Data saved successfully");
    } else alert("try again");
    // window.location.reload();
  };

  return (
    <>
      <div className="Registrationform">
        <img src="src\Componnents\Registration\Brandlogo.png" alt="Logo"></img>
        <h2>Registration</h2>
        <div className="Registration-Box">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            type="email"
            label="email"
            required
            variant="outlined"
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <br />
          <Button className="btn" variant="contained" onClick={handlsubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default Registration;
