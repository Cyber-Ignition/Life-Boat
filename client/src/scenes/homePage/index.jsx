import Navbar from "scenes/navbar";
import { Box, Typography, useTheme, Button } from "@mui/material";
import Slider from 'react-slick';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import { setCartItemRemove } from 'state';
import doctor from "../../components/images/doctor-appointment.jpg";
import labtest from "../../components/images/labtest.png";
import buymeds from "../../components/images/buymeds.png";
import bloodDonate from "../../components/images/bloodDonate.png";
import healthcare from "../../components/images/healthcare.png";
import prescription from "../../components/images/prescription.png";
import fruits from "../../components/images/fruits.png";
import glucometer from "../../components/images/glucometer.png";
import checkup from "../../components/images/checkup.png";
import thermo from "../../components/images/thermo.png";
import woman from "../../components/images/woman.png";
import bone from "../../components/images/bone.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <ArrowForwardIcon sx={{
            "& .MuiSvgIcon-root": {
              fill: null,
          }
          }}/>,
          prevArrow: <ArrowBackIcon sx={{
            "& .css-1nijkmi-MuiSvgIcon-root": {
                fill: null
            }
          }}/>
      };
    const settingslab = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: "linear",
        nextArrow: <ArrowForwardIcon sx={{
            "& .MuiSvgIcon-root": {
              fill: null,
          }
          }}/>,
          prevArrow: <ArrowBackIcon sx={{
            "& .css-1nijkmi-MuiSvgIcon-root": {
                fill: null
            }
          }}/>
      };

    const slides = [{src: doctor, path: "medical-services"}, 
        {src: labtest, path: "lab-tests"}, 
        {src: buymeds, path: "buy-medicines"}, 
        {src: bloodDonate, path: "blood-donation"}, 
        {src: healthcare, path: "health"}];
    
    const labtests = [{src: checkup, path: "medical-services"}, 
        {src: bone, path: "health"}, 
        {src: glucometer, path: "lab-tests"},
        {src: fruits, path: "buy-medicines"}, 
        {src: thermo, path: "blood-donation"}, 
        {src: woman, path: "health"}
        ]
    
    const cartitems = useSelector((state) => state.cartitems);
    return (
        <Box>
            <Navbar/>
            <Box width="100%" p="1rem 6%">
                <Typography textAlign="center" style = {{cursor: "pointer"}}onClick={() => navigate("/upload-prescription")}>
                    Order with prescription - UPLOAD NOW
                </Typography>
            </Box>
            <Box width="94%" margin="auto">
                <Slider {...settings}>
                    {slides.map((images) => 
                        <Box margin={2} p={1}>
                            <img src={images.src} alt={images.path} width={400} style = {{cursor: "pointer"}} onClick={() => navigate(images.path)}/>
                        </Box>
                    )}
                </Slider>
            </Box>
            {cartitems.length > 0 && 
            <Box>
                <Box m={2} p={1} marginTop={7} display="flex">
                    <Typography style={{fontSize: "1.5rem"}}>
                        {cartitems.length} Item(s) in your cart
                    </Typography>
                    <ShoppingCartIcon style={{fontSize: "2rem", marginLeft: "0.5rem"}}/>
                </Box>
                <Box display="flex">
                    {cartitems.map((item) => 
                        <Box width={300} bgcolor={theme.palette.mode === "dark" ? "black" : "white"} p={1} m={2} display="flex" justifyContent="space-between" boxShadow={theme.palette.mode === "dark" ? "0px 5px 5px 0px #6e6e6e" : "0px 5px 5px 0px black"}>
                            <Typography style={{fontSize: "1rem"}}>
                                {item.name}
                            </Typography>
                            <CancelIcon onClick={() => dispatch(setCartItemRemove(item.name))} style={{cursor: "pointer"}}/>
                        </Box>
                    )}
                </Box>
            </Box>}
            <Box display="flex" marginTop={5} marginLeft={4} p={1}>
                <Box display="flex" bgcolor={theme.palette.mode === "dark" ? "black" : "white"} border="1px solid #b5b5b5">
                    <img src={prescription} alt="prescription" height={135} style={{margin: "1rem"}}/>
                    <Box m={1} p={1}>
                        <Typography style={{fontSize: "1.2rem", fontWeight: "500"}}>Order with Prescription</Typography>
                        <Typography m={2} marginLeft={0}>Upload Prescription and we will deliver your medicines</Typography>
                        <Button         
                        onClick={() => navigate("/upload-prescription")}
                        sx = {{
                            m: "2rem 2rem",
                            marginBottom: "0rem",
                            marginTop: "0rem",
                            p: "1rem",
                            width: "150px",
                            display: "flex",
                            justifyContent: "space-evenly",
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
                            <AttachFileIcon/>
                            <Typography>
                                UPLOAD
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Box bgcolor={theme.palette.mode === "dark" ? "#242424" : "#eef5fe"} border="1px solid #b5b5b5" borderLeft="0">
                    <Box m={1} p={1}>
                        <Typography style={{fontSize: "1.1rem", fontWeight: "500"}}>How does this work?</Typography>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography m={2} marginLeft={0}>(1) Upload a photo of your prescription</Typography>
                            <Typography m={2}>(2) Our system will detect the medicines prescribed to you</Typography>
                        </Box>
                        <Box display="flex">
                            <Typography m={2} marginLeft={0} marginTop={0}>(3) Add the medicines to your cart</Typography>
                            <Typography m={2} marginTop={0} marginLeft={5.5}>(3) Click on view cart, add delivery address and place the order</Typography>
                        </Box>
                        <Typography style={{fontWeight: "500"}}>
                            Now sit back, and relax! Medicines will get delivered at your doorstep very soon
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography m={2} marginTop={5} p={1} style={{fontSize: "2rem", fontWeight: "500"}}>
                    Lab Tests by Health Concern
                </Typography>
                <Box width="94%" margin="auto">
                <Slider {...settingslab}>
                    {labtests.map((images) => 
                        <Box margin={2} p={1}>
                            <img src={images.src} alt={images.path} width={250} style = {{cursor: "pointer"}} onClick={() => navigate(images.path)}/>
                        </Box>
                    )}
                </Slider>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage;