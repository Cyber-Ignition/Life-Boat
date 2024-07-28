import React, { useState, useEffect } from 'react'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { Box, IconButton, useTheme, InputBase, Typography, Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FlexBetween from 'components/FlexBetween';
import { ContactSupport, Search } from '@mui/icons-material';
import BiotechIcon from '@mui/icons-material/Biotech';
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from 'state';

import "./bloodTest.css";

const Test = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartitems = useSelector((state) => state.cartitems);
  const testData = useSelector((state) => state.testData);
  const cartTests = [];
  cartitems.map((obj) => cartTests.push(obj.name));
  console.log(testData);
  const neutralLight = theme.palette.neutral.light;
  const [labTestInfo, setLabTestInfo] = useState(null);
  const [CompInfo, setCompInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const testAdded = cartTests.includes(testData.name);
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayFooter, setDisplayFooter] = useState(true);
  async function getWikiResponse(url, config) {
    const res = await axios.get(url, config);
    return res;
  };
  useEffect(() => {
      const WIKI_URL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=4&exlimit=3&exintro&titles=${testData.query}&explaintext=1&format=json&formatversion=2&origin=*`
      const wikiConfig = {
        timeout: 6500 * 6500
    };
      getWikiResponse(WIKI_URL, wikiConfig).then(result => {
      setLabTestInfo(result.data.query.pages[0].extract);
    })
  }, [testData.query]);

  useEffect(() => {
      fetch(testData.file)
      .then(r => r.text())
      .then(text => setCompInfo(text.split("\n")));
  }, [testData.file]);
  console.log(CompInfo);

  const handleChange = () => {
    setExpanded(!expanded);
  }

  const handleAdd = () => {
    dispatch(setCartItem({name: testData.name, price: "5"}));
    setDisplayFooter(true);
  }

  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%">
        <FlexBetween>
          <img src={theme.palette.mode === "dark" ? dlogo : logo} alt="lifeboat" width={170} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
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
      <Box display="flex" justifyContent="space-evenly" marginTop={1}>
        <Box m={2} width="40%" bgcolor={theme.palette.mode === "dark" ? "black" : "white"} height="fit-content" boxShadow= {theme.palette.mode === "dark" ? "5px 5px 10px 7px #363636" : "5px 5px 10px 1px #000"} borderRadius={2} sx={{borderTopRightRadius: "0", borderTopLeftRadius: "0"}}>
          <Box p={1} m={2} marginBottom={0}>
            <Typography style={{fontSize: "2rem"}}>
                {testData.name}
            </Typography>
          </Box>
          <Box borderBottom="1px solid rgb(0,0,0,0.2)">
            <Typography m={2} marginTop={0} p={1} style={{fontStyle: "italic"}}>
              {labTestInfo}
            </Typography>
          </Box>
          <Box display="flex" m={2} p={1} marginBottom={0}>
            <CalendarMonthIcon style={{fontSize: "1.7rem"}}/>
            <Typography marginLeft={2} p={0.4} style={{fontSize: "1rem"}}>Next Slot: <strong style={{fontFamily: "Rubik", fontWeight: "500"}}>09:00 AM, Tomorrow</strong></Typography>
          </Box>
          <Box display="flex" m={2} p={1} marginTop={0} marginBottom={0}>
            <DescriptionIcon style={{fontSize: "1.7rem"}}/>
            <Typography marginLeft={2} p={0.4} style={{fontSize: "1rem"}}>Reports in <strong style={{fontFamily: "Rubik", fontWeight: "500"}}>6 hours</strong></Typography>
          </Box>
          <Box display="flex" m={2} p={1} marginTop={0}>
            <ContactSupport style={{fontSize: "1.7rem"}}/>
            <Typography marginLeft={2} p={0.4} style={{fontSize: "1rem"}}>No preparation required</Typography>
          </Box>
          <Button
            onClick={() => {
              testAdded ? setErrorMessage("Test has already been added") : handleAdd()
            }}
            sx={{
              alignSelf: "flex-end",
              p: "1rem",
              width: "100%",
              fontSize: "1rem",
              borderTopRightRadius: "0",
              borderTopLeftRadius: "0",
              backgroundColor: "#2c79f5",
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#cfe2ff",
                color: theme.palette.mode === "dark" ? "#fff" : "#000"
              }
            }}
          >
            <Typography marginRight={3} style={{fontWeight: "500"}}>
              {testAdded ? "ADDED TO CART" : "ADD TO CART"}
            </Typography>
            <AddShoppingCartIcon />
          </Button>
          {errorMessage && <Typography m={2} p={1} color="#ff0000">
            {errorMessage}
          </Typography>}
        </Box>
        <Box display="flex" flexDirection="column" p={1} m={2} bgcolor={theme.palette.mode === "dark" ? "black" : "white"} width="50%" boxShadow={theme.palette.mode === "dark" ? "5px 5px 10px 7px #363636" : "5px 5px 10px 1px #000"}>
          <Box display="flex" flexDirection="row" marginRight="auto" marginLeft="auto">
              <BiotechIcon style={{fontSize: "3rem", marginTop: "1rem"}}/>
              <Typography mx={2} marginTop={2} style={{fontSize: "2rem"}}>
                {`Test(s) included (${testData.testnumber})`}
              </Typography>
          </Box>
          <Box marginRight="0" marginLeft="0" width="100%">
                <Accordion
                allowZeroExpanded
                onChange={handleChange}
                >
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                      <Button
                        sx = {{
                            m: "2rem",
                            p: "1rem",
                            width: "90%",
                            marginBottom: "2rem",
                            backgroundColor: "#e60f00",
                            borderRadius: "0",
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#910000" : "#ffbab5",
                                color: theme.palette.mode === "dark" ? "#fff" : "#000"
                            }
                        }}
                        >
                          <Typography display="flex" style={{fontSize: "1rem", fontWeight: "500"}}>
                            <Box>
                              {expanded ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                            </Box>
                            {testData.button} {`(${testData.testnumber} tests)`}
                          </Typography>
                          </Button>
                        {/* <Box p={2} m={2} bgcolor="azure" display="flex" style={{cursor: "pointer"}}>
                        
                          <Typography marginLeft={2}>Complete Blood Count (29 tests)</Typography>
                        </Box> */}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        {CompInfo && CompInfo.map((item) => (
                          <Box p={0.5} marginLeft={3.5}>
                              <Typography>{item}</Typography>
                          </Box>
                        ))}
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
          </Box> 
        </Box>
        
      </Box>
      {testAdded && displayFooter && <Box className="footer--box" display="flex" alignSelf="center" position="fixed" bottom="0" width="90%" backgroundColor={theme.palette.mode === "light" ? "white" : "black"}
      border={theme.palette.mode === "light" ? "" : "1px solid #595959"} boxShadow= {theme.palette.mode === "light" ? "5px 10px 10px 5px #000" : "5px 10px 10px 10px #fff"}>
        <ShoppingCartCheckoutIcon style={{ fontSize: "1.5rem", marginTop: "3.5rem", marginLeft: "2rem" }} />
        <Typography m="2rem" p="1rem" width={850} style={{ fontWeight: "500", fontSize: "1rem" }}>
          {testData.name} has been added to your cart successfully.
          <CheckIcon style={{ fontSize: "1.5rem", marginLeft: "2rem", backgroundColor: theme.palette.mode === "dark" ? "#00c24d" : "#00e35b" }} />
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

export default Test
