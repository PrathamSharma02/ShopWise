import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userRedux';

const Container = styled.div`
height: 60px;
${mobile({height: "50px"})}
}
`;
const Wrapper=styled.div`
padding: 10px 20px;
display: flex; {/* This is to display text horijontally */}
justify-content: space-between;
align-items:center;
${mobile({padding: "10px 0px"})}
`;
const Left = styled.div`
flex:1; {/* It takes 1 unit each on the screen and divides themselves equally */}
display: flex;
align-items:center;
`;

const Language = styled.span`
font-size: 14px;
cursor: pointer
${mobile({display: "none"})}
`;
const SearchConatiner = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items:center;
margin-left: 25px;
padding: 5px;
`;
const Input = styled.input`
border: none;
${mobile({width: "50px"})}
`;

const Center = styled.div`
flex:1;
text-align: center; 
`;
const Logo = styled.h1`
font-weight: bold;
${mobile({fontSize: "24px"})}
`
const Right = styled.div`
flex:1;
display: flex;
align-items:center;
justify-content: flex-end;
${mobile({flex:2,justifyContent: "center"})}
`;

const MenuItem = styled.div`
font-size: 14px;
cursor:pointer;
margin-left: 25px;
${mobile({fontSize: "12px",marginLeft:"10px"})}
`
const Navbar = () => {

  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const quantity = useSelector(state=>state.cart.totalItems);
  const uniqueProductsCount = cart.products.length;

  const handleLogout = () => {
    // Dispatch the logout action to clear the user data from Redux store
    dispatch(logout());
    // Redirect to the home page or any other desired page after logout
    navigate("/");
  };
  // const user = useSelector(state => state.user.username); // user state contains the user information
  return (
    <Container>
        <Wrapper>
        <Left>
            <Language>EN</Language>
            <SearchConatiner>
                 <Input placeholder="Search"/>
                <Search style={{color:"gray", fontSize:16}}/>
            </SearchConatiner>
        </Left>
        <Center><Logo>Sharma</Logo>
        
        </Center>
        <Right>
        {user ? (
            <>
              <MenuItem>Hello, {user.username}</MenuItem>
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            </>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
        <Link to= "/cart">
        
        <MenuItem>
        <Badge badgeContent={uniqueProductsCount} color="primary">
        <ShoppingCartOutlined/>
        </Badge>
        </MenuItem>
        </Link>
        </Right>
        </Wrapper>
        </Container>
  )
}

export default Navbar