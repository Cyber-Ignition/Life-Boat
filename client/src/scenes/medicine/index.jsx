import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Typography, Box, useTheme, InputBase, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { Route, useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";
import { setCartItem, setCartItemRemove } from 'state';

const _ = require('lodash');

const Medicine = () => {
  const name = useSelector((state) => state.medname);
  const cartarr = useSelector((state) => state.cartitems);
  const [displayFooter, setDisplayFooter] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const navigate = useNavigate();
  const [drugInfo, setDrugInfo] = useState(null);
  const drugQueryHalf = name.label.split(" ")[0].toLowerCase();
  const drugQueryFull = name.label.split(" ").join("").toLowerCase();
  console.log(drugQueryFull);
  const WIKI_URL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=2&exintro&titles=${drugQueryHalf}|${drugQueryFull}&explaintext=1&format=json&formatversion=2&origin=*`
  console.log(drugInfo);
  const wikiConfig = {
    timeout: 6500 * 6500
  };

  const drugTitle = _.startCase(name.label.toLowerCase());
  const strength = name.strength.toLowerCase();
  const drugBrand = _.startCase(name.brand.toLowerCase());
  const drugDosage = _.startCase(name.dose.toLowerCase());
  const drugSponsor = _.startCase(name.sponsor.toLowerCase());
  const drugRoute = _.startCase(name.route.toLowerCase());
  const drugAddedtoCart = cartarr.includes(drugTitle)

  async function getWikiResponse(url, config) {
    const res = await axios.get(url, config);
    return res;
  };
  getWikiResponse(WIKI_URL, wikiConfig).then(result => {
    setDrugInfo(result.data.query.pages[0].extract || result.data.query.pages[1].extract)
  });

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%">
        <FlexBetween>
          <img src={theme.palette.mode === "dark" ? dlogo : logo} width={170} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
          <FlexBetween backgroundColor={neutralLight} padding="0.1rem 1.5rem">
            <InputBase sx={{
              width: "900px",
              fontSize: "1rem",
            }} placeholder="Search for Medicines/Healthcare products/Pharmaceuticals" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </Box>
      <Box p="1rem" display="flex" width="100%">
        <Typography minWidth={1050} style={{ fontSize: "5rem" }}>
          {drugTitle}
        </Typography>
        <Box display="flex" flexDirection="column">
          <Button
            onClick={() => {
              drugAddedtoCart ? setErrorMessage("This order has already been added") : dispatch(setCartItem(drugTitle))
            }}
            sx={{
              marginTop: "2rem",
              p: "2rem 2rem",
              alignSelf: "flex-end",
              p: "1rem",
              width: drugAddedtoCart ? "210x" : "180px",
              fontSize: "1rem",
              backgroundColor: "#2c79f5",
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#cfe2ff",
                color: theme.palette.mode === "dark" ? "#fff" : "#000"
              }
            }}
          >
            <Typography marginRight={3}>
              {drugAddedtoCart ? "ADDED TO CART" : "ADD TO CART"}
            </Typography>
            <AddShoppingCartIcon />
          </Button>
          {drugAddedtoCart && <Button
            onClick={() => dispatch(setCartItemRemove(drugTitle))}
            sx={{
              marginTop: "2rem",
              p: "2rem 2rem",
              alignSelf: "flex-end",
              p: "1rem",
              width: "180px",
              fontSize: "1rem",
              backgroundColor: "#e60f00",
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#ffbab5",
                color: theme.palette.mode === "dark" ? "#fff" : "#000"
              }
            }}
          >
            <Typography>
              CANCEL
            </Typography>
          </Button>}

          <Typography marginTop={1} color="#ff1100">{errorMessage}</Typography>
        </Box>
      </Box>
      <Box p="1rem" marginBottom={5}>
        <Typography style={{ fontSize: "1rem" }}>
          {drugInfo || "No information found for this drug. Apologies for the inconvenience."}
        </Typography>
      </Box>
      <Box width="100%">
        <Typography width="25%" display="flex" style={{ marginRight: "auto", marginLeft: "auto" }}>
          Strength - {strength}<br /><br />
          Brand Name - {drugBrand}<br /><br />
          Dosage Form - {drugDosage}<br /><br />
          Consume Type - {drugRoute}<br /><br />
          Sponsor Name - {drugSponsor}
        </Typography>
      </Box>

      {drugAddedtoCart && displayFooter && <Box display="flex" alignSelf="center" position="fixed" bottom="0" width="90%" backgroundColor="white" boxShadow="5px 10px 10px 5px #000">
        <ShoppingCartCheckoutIcon style={{ fontSize: "1.5rem", marginTop: "3.5rem", marginLeft: "2rem" }} />
        <Typography m="2rem" p="1rem" width={850} style={{ fontWeight: "500", fontSize: "1rem" }}>
          {drugTitle} has been added to your cart successfully.
          <CheckIcon style={{ fontSize: "1.5rem", marginLeft: "2rem", backgroundColor: "#00e35b" }} />
        </Typography>
        <Button
          onClick={() => navigate("/medicines-cart")}
          sx={{
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
            VIEW CART
          </Typography>
        </Button>
        <CloseIcon onClick={() => setDisplayFooter(false)} style={{ cursor: "pointer" }} />
      </Box>}
    </Box>
  )
}

export default Medicine
