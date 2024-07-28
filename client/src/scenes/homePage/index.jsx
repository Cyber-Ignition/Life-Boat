import Navbar from "scenes/navbar";
import { Box, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";
import doctor from "../../components/images/doctor-appointment.jpg";
import labtest from "../../components/images/labtest.png";
import buymeds from "../../components/images/buymeds.png";
import bloodDonate from "../../components/images/bloodDonate.png";

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
        cssEase: "linear"
      };

    const slides = [{src: doctor}, {src: labtest}, {src: buymeds}, {src: bloodDonate}, {src: doctor}]
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
                        <Box display="flex" margin={2} p={1}>
                            <img src={images.src} width={400}/>
                        </Box>
                    )}
                </Slider>
            </Box>
        </Box>
        
    )
}

export default HomePage;