import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';
import {userRequest} from '../requestMethods';
import { addProduct, deleteProduct } from "../redux/cartRedux"

const KEY = process.env.REACT_APP_STRIPE;
const Container=styled.div``;
const Wrapper=styled.div`
padding: 20px;
${mobile({padding: "10px"})}
`;
const Title=styled.h1`
font-weight:300;
text-align: center;
`;
const Top=styled.div`
display: flex;
align-items:center;
justify-content:space-between;
padding:20px;
`;

const TopButton=styled.button`
padding: 10px;
font-weight:600;
cursor:pointer;
border: ${(props)=>props.type === "filled"&& "none"};
background-color: ${(props)=>props.type === "filled" ? "black":"transparent"};
color: ${(props)=>props.type === "filled"&& "white"};
`;

const TopTexts=styled.div`
${mobile({display: "none"})}
`;

const TopText=styled.span`
text-decoration:underline;
cursor: pointer;
margin:0px 10px;
`;

const Bottom=styled.div`
display : flex;
justify-content:space-between;
${mobile({flexDirection: "column"})}
`;
const Info=styled.div`
flex:3;
`;

const Product=styled.div`
display : flex;
justify-content:space-between;
${mobile({flexDirection: "column"})}
`;
const ProductDetail=styled.div`
flex:2;
display : flex;
`;

const Image=styled.img`
width:200px;
height:200px;
bject-fit:cover;
`;

const Details=styled.div`
padding:20px;
display : flex;
flex-direction:column;
justify-content:space-around;
`;

const ProductName=styled.span``;

const ProductId=styled.span``;

const ProductColor=styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color: ${props=>props.color} 
`;

const ProductSize=styled.span``;

const PriceDetail=styled.div`
flex:1;
display: flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const ProductAmountContainer=styled.div`
display: flex;
align-items:center;
margin-bottom:20px;
cursor: pointer;
`;

const ProductAmount=styled.div`
font-size: 24px;
margin:5px;
${mobile({margin: "5px 15px"})}
`;

const ProductPrice=styled.div`
font-size:30px;
font-weight:200;
${mobile({marginBottom: "20px"})}
`;

const Hr=styled.hr`
background-color: #eee;
border:none;
height:1px;
`;

const Summary=styled.div`
flex:1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding:20px;
height:60vh;
`;
const SummaryTitle=styled.h1`
font-weight:200;
`;
const SummaryItem=styled.div`
margin: 30px 0px;
display: flex;
justify-content:space-between;
font-weight:${props=>props.type==="total"&&"500"};
font-size:${props=>props.type==="total"&&"24px"};
`;
const SummaryItemText=styled.span``;
const SummaryItemPrice=styled.span``;
const Button=styled.button`
width:100%;
padding: 10px;
background-color: black;
color: white;
font-weight:600;
cursor:pointer;
`;

const Cart = () => {
    const cart = useSelector(state=>state.cart);
    const [stripeToken, setStripeToken] = useState(null);
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const handleAddToCart = (product) => {
        dispatch(addProduct(product));
      };
    
      const handleRemoveFromCart = (productId) => {
        dispatch(deleteProduct(productId));
      };

    const onToken = (token) => {
      setStripeToken(token);
    };
    useEffect(() => {
        const fetchCart = async () => {
          try {
            const res = await userRequest.post('/cart');
            // Update the cart in the Redux store with the user-specific cart data
            dispatch({ type: 'SET_CART', payload: res.data });
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchCart();
    }, [dispatch]);
    

    const subtotal = cart.products.reduce(
        (accumulator, product) => accumulator + product.price * product.quantity,
        0
      );
      const total = subtotal;
    useEffect(()=>{
        const makeRequest = async ()=>{
            try{
                const res = await userRequest.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:500,
                    
                });
                if (res.data.status === 'succeeded') {
                    // Payment succeeded, navigate to the success page
                    navigate('/success');
                  } else {
                    // Payment failed, handle the error (show an error message, etc.)
                    console.log('Payment failed:', res.data);
                    // ... (rest of the error handling code)
                  }
                //  navigate("/success", { state: { data: res.data } });
            }
            catch {}
        };
        stripeToken && makeRequest();
    },[stripeToken,cart.total,navigate]);
  return (
    <Container>
        <Navbar/>
        <Announcement/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your WishList(0)</TopText>
                    </TopTexts>
                    
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product=>(
                        <Product>
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><b>Product:</b> {product.title}</ProductName>
                                    <ProductId><b>ID:</b>{product._id}</ProductId>
                                    <ProductColor color={product.color}/>
                                    <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                <Remove onClick={() => handleRemoveFromCart(product._id)} />
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Add onClick={() => handleAddToCart(product)} />
                  
                                    {/* <Add/>
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove/> */}
                                </ProductAmountContainer>
                                <ProductPrice>₹{product.price*product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                        ))}
                        <Hr/>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>₹{subtotal}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>₹50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>-₹50</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText >Total</SummaryItemText>
                            <SummaryItemPrice>₹{total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                          name="Sharma Shop"
                           image="https://avatars.githubusercontent.com/u/1486366?v=4"
                           billingAddress
                           shippingAddress
                           description={`Your total is ₹${total}`}
                            amount={total * 100}
                           token={onToken}
                           stripeKey={KEY}
                           >
                      <Button>CHECKOUT NOW</Button>
                  </StripeCheckout>    
                    </Summary>
                </Bottom>

            </Wrapper>
        <Footer/>

    </Container>
  )
}

export default Cart