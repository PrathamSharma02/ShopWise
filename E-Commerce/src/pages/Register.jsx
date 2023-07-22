import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { register,login } from '../redux/apiCalls';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://i.ibb.co/Ky9d5gn/registerpage.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      console.error("Password and confirm password do not match");
      return;
    }
    
    try {
      // Make the API call to register the user
      const response = await register(dispatch,user);

      // Handle successful registration
      // You can dispatch actions here if needed
      console.log("User registered successfully!", response);

      // Automatically log in the user after successful registration
      // Assuming the login API call sets the user data in Redux store
      // You can adjust this according to how your login process works
      login(dispatch, {
        username: user.username,
        password: user.password,
      });
      // dispatch(loginSuccess(response));
      // Redirect the user to the homepage after successful registration and login
      navigate("/"); // Replace "/" with the URL of your homepage
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleRegister}>
        <Input
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <Input
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <Input
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="Username"
            autoComplete="new-password"
          />
          <Input
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <Input
            name="password"
            value={user.password}
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />

          <Input
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password" // Set autoComplete to new-password
          />
          
          <Input
            name="address"
            value={user.address}
            onChange={handleInputChange}
            placeholder="Address"
            />
          <Input
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          {/* <Input placeholder="Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <Input placeholder="Address" />
          <Input placeholder="Phone Number" /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
