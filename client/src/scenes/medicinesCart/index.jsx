import React, { useEffect, useState } from 'react';
import { Typography, Box, useTheme, Button, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo from "../../components/images/logo.png";
import dlogo from "../../components/images/dlogo.png";
import FlexBetween from 'components/FlexBetween';
import cart from "../../components/images/cart.png";
import { useDispatch, useSelector } from 'react-redux';
import { setCartItemRefresh, setCartItemRemove } from 'state';
import { useNavigate } from 'react-router-dom';

const MedicinesCart = () => {
    const cartitems = useSelector((state) => state.cartitems);
    const userToken = useSelector((state) => state.token);
    const [applyError, setApplyError] = useState(null);
    const priceList = [];
    
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const neutralLight = theme.palette.neutral.light;
    cartitems.map((item) => priceList.push(Number(item.price)))
    const totalPrice = priceList.reduce((a,b) => a+b, 0);
    console.log(totalPrice);
    const cartData = cartitems.map((item) =>
    <Box display="flex" backgroundColor={theme.palette.mode === "light" ? "white" : "black"} border={theme.palette.mode === "light" ? "" : "1px solid #595959"} marginY={1.5} p="1rem" width={550}>
        <Typography style={{fontSize: "1rem"}} width={490}>
            {item.name} {item.price}
        </Typography>
        <CancelIcon onClick={() => dispatch(setCartItemRemove(item.name))} style={{cursor: "pointer"}}/>
    </Box>
);
    console.log(cartitems);
  return (
    cartitems.length > 0 ? (
    <Box>
        <Box width="100%" backgroundColor= {theme.palette.background.alt} p="1rem 6%">
                    <FlexBetween>
                        <img src={theme.palette.mode === "dark" ? dlogo : logo} width={170} onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
                        <FlexBetween backgroundColor={neutralLight} padding="0.1rem 1.5rem">
                            <InputBase sx = {{
                                width: "900px",
                                fontSize: "1rem",
                            }}placeholder="Search for Medicines/Healthcare products/Pharmaceuticals"/>
                            <IconButton>
                                <Search/>
                            </IconButton>
                        </FlexBetween>
                    </FlexBetween>
                </Box>
        <Box display="flex">
        <Box display="flex" flexDirection="column" p="1rem" width="42%">    
            <Typography style={{fontSize: "2rem", marginTop: "1rem", marginBottom: "0.5rem"}}>
                ITEMS IN YOUR CART ({cartitems.length})
            </Typography>
            {cartData}
            <Button         
            onClick={() => dispatch(setCartItemRefresh())}
            sx = {{
                m: "2rem 2rem",
                p: "1rem",
                width: "180px",
                alignSelf: "center",
                fontSize: "1rem",
                backgroundColor: "#2c79f5",
                color: theme.palette.background.alt,
                "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#cfe2ff",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000"
                }
            }}
            >
                <Typography>
                    REFRESH
                </Typography>
            </Button>
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
        <Box width="100%" display="flex" flexDirection="column" alignItems="center">
            <Box p="1rem" m={2} alignSelf="flex-start" marginLeft={5}>
                <Typography style={{fontSize: "2rem"}}>
                    OFFERS & DISCOUNTS
                </Typography>
            </Box>
            <Box backgroundColor= {theme.palette.mode === "dark" ? "black" : "white"} width="85%" display="flex" flexDirection="column" border= {theme.palette.mode === "dark" ? "1px solid #595959" : "1px solid #cfcfcf"}>
                <Box borderBottom="1px solid #cfcfcf" display="flex">
                <Box display="flex" flexDirection="column">
                <Button         
                    onClick={() => userToken ? console.log("Applied") : setApplyError("Please login first to apply for coupons")}
                    sx = {{
                        m: "2rem 2rem",
                        marginBottom: "0.5rem",
                        p: "1rem",
                        width: "300px",
                        alignSelf: "center",
                        fontSize: "1rem",
                        backgroundColor: "#00bf59",
                        color: theme.palette.background.alt,
                        "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "#007034" : "#82ffbc",
                            color: theme.palette.mode === "dark" ? "#fff" : "#000"
                        }
                    }}
                    >
                        <Typography marginRight={2} p={1}>
                            APPLY FOR COUPONS
                        </Typography>
                        <LocalOfferIcon/>
                    </Button>
                    <Typography marginLeft="2rem" style={{color: "#ff0000"}}>
                        {applyError}
                    </Typography>
                    
                    </Box>
                    <Box p="1rem" m="1.75rem" marginLeft="0rem" marginRight="1rem" width="55%">
                        <Typography style={{fontSize: "1rem", fontWeight: "500"}}>
                            Continue to login
                        </Typography>
                        <Box display="flex">
                            <Typography display="flex" marginRight={1} onClick={() => navigate("/login")} style={{fontSize: "1rem", cursor: "pointer"}}>
                                Login to apply for coupons
                                
                            </Typography>
                            <ArrowForwardIcon/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box width="100%" display="flex" flexDirection="column" alignItems="center">
            <Box p="1rem" m={2} alignSelf="flex-start" marginLeft={5}>
                <Typography style={{fontSize: "2rem"}}>
                    CART BREAKDOWN
                </Typography>
            </Box>
            <Box backgroundColor={theme.palette.mode === "dark" ? "black" : "white"} width="85%" display="flex" flexDirection="column" border={theme.palette.mode === "dark" ? "1px solid #595959" : "1px solid #cfcfcf"}>
                <Box width="90%" alignSelf="center" borderBottom={theme.palette.mode === "dark" ? "1px solid #595959" : "1px solid #cfcfcf"}>
                    <Typography p="1rem">Cart Total:</Typography>
                    <Typography p="1rem">Delivery Charges:</Typography>
                </Box>
                <Box width="90%" alignSelf="center">
                    <Typography p="1rem">Total Payable Amount:</Typography>
                </Box>
            </Box>
        </Box>
        </Box>
        </Box>
    </Box>
    ) :
    (<Box display="flex" flexDirection="column" alignItems='center'>
        <img src={cart} width={450}/>
        <Typography style={{fontSize: "2rem"}}>
            CART IS EMPTY AT THE MOMENT 
        </Typography>
    </Box>)
  )
}

export default MedicinesCart
