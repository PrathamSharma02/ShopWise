import { Facebook, Instagram, LocalPhone, LocationOn, Mail, Twitter } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components'
import {mobile} from "../responsive"

const Container=styled.div`
display : flex;
${mobile({flexDirection:"column"})}
`;

const Left=styled.div`
flex:1;
display: flex;
flex-direction: column;
padding: 20px;
`;

const Logo=styled.h1``;
const Desc=styled.p`
margin: 20px 0px;
`;
const SocialContainer=styled.div`
display : flex;
`;
const SocialIcon=styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
display:flex;
align-items:center;
justify-content: center;
margin-right:20px;
background-color: #${props=>props.color};
`;

const Center=styled.div`
flex:1;
padding:20px;
${mobile({display:"none"})}
`;

const Title=styled.h3`
margin-bottom: 20px;
`;

const List=styled.ul`
margin:0;
padding:0;
list-style: none;
display:flex;
flex-wrap:wrap;
`;

const ListItem=styled.li`
width:50%; 
margin-bottom: 10px;
`;

const Right=styled.div`
flex:1;
padding:20px;
${mobile({backgroundColor:"#fff8f8"})}
`;

const ContactItem=styled.div`
margin-bottom: 20px;
display:flex;
align-items:center;
`;

const Payment=styled.img`
width: 50%;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>SHARMA.</Logo>
            <Desc>
            At SHARMA. we believe that shopping should be enjoyable, convenient, and personalized. That's why we have curated a diverse collection of products across various categories, including fashion, electronics, home decor, beauty, and much more. Whether you're looking for trendy apparel, the latest gadgets, stylish home accents, or top-notch beauty products, we have got you covered.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
            <LocationOn style={{marginRight:"10px"}}/>
            1234, ABC Street,XYZ Colony,New Delhi - 110001,India.
            </ContactItem>
            <ContactItem>
                <LocalPhone style={{marginRight:"10px"}}/>
            +91-98757787686
            </ContactItem>
            <ContactItem>
                <Mail style={{marginRight:"10px"}}/>
            contact@sharma.com
            </ContactItem>
            <Payment src=""/>
        </Right>
    </Container>
  )
}

export default Footer