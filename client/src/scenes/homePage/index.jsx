import Navbar from "scenes/navbar";
import { Box, Typography } from "@mui/material";
import Slider from 'react-slick';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import doctor from "../../components/images/doctor-appointment.jpg";
import labtest from "../../components/images/labtest.png";
import buymeds from "../../components/images/buymeds.png";
import bloodDonate from "../../components/images/bloodDonate.png";
import healthcare from "../../components/images/healthcare.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    const navigate = useNavigate();
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

    const slides = [{src: doctor, path: "medical-services"}, 
        {src: labtest, path: "lab-tests"}, 
        {src: buymeds, path: "buy-medicines"}, 
        {src: bloodDonate, path: "blood-donation"}, 
        {src: healthcare, path: "health"}]
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
        </Box>
        
    )
}

export default HomePage;