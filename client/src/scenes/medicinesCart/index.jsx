import React from 'react';
import { Typography, Box, useTheme, Button, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import logo from "../../components/images/logo.png";
import dlogo from "../../components/images/dlogo.png";
import FlexBetween from 'components/FlexBetween';
import cart from "../../components/images/cart.png";
import { useDispatch, useSelector } from 'react-redux';
import { setCartItemRefresh, setCartItemRemove } from 'state';
import { useNavigate } from 'react-router-dom';

const MedicinesCart = () => {
    const cartitems = useSelector((state) => state.cartitems);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const neutralLight = theme.palette.neutral.light;
    const cartData = cartitems.map((item) => 
    <Box display="flex" backgroundColor={theme.palette.mode === "light" ? "white" : "black"} marginY={1.5} p="1rem" width={550}>
        <Typography style={{fontSize: "1rem"}} width={490}>
            {item}
        </Typography>
        <CancelIcon onClick={() => dispatch(setCartItemRemove(item))} style={{cursor: "pointer"}}/>
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
            <Typography style={{fontSize: "2rem", marginTop: "1rem", marginBottom: "0.5rem", alignSelf: "center"}}>
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
        <Box width="100%" display="flex" flexDirection="column" alignItems="center">
            <Box p="1rem" m={2}>
                <Typography style={{fontSize: "2rem"}}>
                    CART BREAKDOWN
                </Typography>
            </Box>
            <Box backgroundColor="white" width="75%" display="flex" flexDirection="column" alignItems="center" border="1px solid #cfcfcf">
                <Box borderBottom="1px solid #cfcfcf">
                    <Typography p="1rem">Cart Total: $801920</Typography>
                    <Typography p="1rem">Delivery Charges: $801920</Typography>
                </Box>
                <Box>
                    <Typography p="1rem">Total Payable Amount: $801920</Typography>
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
