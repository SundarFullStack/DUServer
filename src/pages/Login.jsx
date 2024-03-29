import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import API_URL from "../../config/global";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HandleChange

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  //handleSubmit



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

    
    if (formData) {
      // console.log(formData);
      const response = await axios.post(`${API_URL}/login`, formData);
      // console.log("response", response.data.message)
      
      if (response.data.message == "Invalid Username or password") {
        alert("Invalid Username or password")
      } else if (response.data.message == "User Authenticated Successfully!!") {
        localStorage.setItem("UserInfo", JSON.stringify(response.data.token));
        navigate("/layout");
        window.location.reload();
      }else{
        console.log(response.data.message)
      }
}
    

    } catch (error) {
      console.log("Error",error)
   }
   
   
  };

  return (
    <Container>
      <h1>Login Form</h1>
      <Form onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Password */}
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Button & Routing for Login Page */}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
