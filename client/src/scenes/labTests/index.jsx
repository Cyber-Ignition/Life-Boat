import React from 'react';
import { Box, IconButton, useTheme, InputBase, Typography, Button, Slide } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlexBetween from 'components/FlexBetween';
import { Search } from '@mui/icons-material';
import Slider from 'react-slick';
import styled from 'styled-components';
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";
import { useNavigate } from 'react-router-dom';
import blood from "../../components/images/blood.png";
import hba1c from "../../components/images/hba1c.png";
import glucose from "../../components/images/glucose.png";
import heart from "../../components/images/heart.png";
import liver from "../../components/images/liver.png";
import thyroid from "../../components/images/thyroid.png";
import kidney from "../../components/images/kidney.png";
import serum from "../../components/images/serum.png";
import vitamind from "../../components/images/vitamin-d.png";
import vitaminb12 from "../../components/images/vitaminb-12.png";
import creactiveprotein from "../../components/images/creactive.png";
import uric from "../../components/images/rna.png";
import rheuma from "../../components/images/rheumatoid.png";
import bloodComponents from "./bloodComponents.txt";
import hbA1c from "./hba1c.txt";
import glucosefast from "./glucose.txt";
import lipidprofile from "./lipidProfile.txt";
import liverFunction from "./liverFunction.txt";
import thyroidProfile from "./thyroidProfile.txt";
import urineExam from "./urineExam.txt";
import renalTest from "./renalTest.txt";
import vitaminD from "./vitaminD.txt";
import vitaminB12 from "./vitaminB12.txt";
import creactive from "./creactive.txt";
import uricacid from "./uricacid.txt";
import ra from "./ra.txt";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { setTestData } from 'state';

const LabTests = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const neutralLight = theme.palette.neutral.light;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
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

    const StyledSlider = styled(Slider)`
      .slick-prev {
    color: "red" !important; 
  }
  .slick-prev:hover, .slick-next:hover{
    color: "" !important;
  }
  .slick-next {
    color: "" !important;
  }

  .slick-slide>div {
    margin: 0 10px;
  }

  .slick-dots li button:before {
    color: ${theme.palette.mode === "dark" ? "white" : "black"} !important;
  }
    `;

    const laboratoryTests = [{name: "Complete Blood Count (CBC)", file: bloodComponents, button: "Complete Blood Count", query: "Complete_blood_count", testnumber: "29", image: blood, path: "blood"},
        {name: "HbA1c (Glycated Hemoglobin)", file: hbA1c, button: "HbA1c, Glycated Hemoglobin", query: "Glycated_hemoglobin", testnumber: "3", image: hba1c, path: "hba1c"},
        {name: "Glucose, Fasting", file: glucosefast, button: "Glucose, Fasting", query: "Glucose_test", testnumber: "1", image: glucose, path: "glucose"},
        {name: "Lipid Profile", file: lipidprofile, button: "Lipid Profile", query: "Lipid_profile", testnumber: "8", image: heart, path: "lipid"},
        {name: "Liver Function Test (LFT)", file: liverFunction, button: "Liver Function Test", query: "Liver_function_tests", testnumber: "10", image: liver, path: "liver"},
        {name: "Thyroid Profile (FT3, FT4, TSH)", file: thyroidProfile, button: "Thyroid Profile", query: "Thyroid_function_tests", testnumber: "4", image: thyroid, path: "thyroid"},
        {name: "Complete Urine Examination", file: urineExam, button: "Complete Urine Examination", query: "Urine_test", testnumber: "17", image: kidney, path: "urine"},
        {name: "Renal Profile/Renal Function Test (RFT/KFT)", file: renalTest, button: "Renal Profile/Renal Function Test", query: "Assessment_of_kidney_function", testnumber: "14", image: kidney, path: "renal"},
        {name: "Creatinine, Serum", file: renalTest, button: "Creatinine, Serum", query: "Creatinine", testnumber: "12", image: serum, path: "renal"},
        {name: "Vitamin D - 25 Hydroxy (D2+D3)", file: vitaminD, button: "Vitamin D - 25 Hydroxy ", query: "25-Hydroxyvitamin_D_1-alpha-hydroxylase", testnumber: "1", image: vitamind, path: "vitamin-d"},
        {name: "Vitamin B12", file: vitaminB12, button: "Vitamin B12", query: "Vitamin_B12", testnumber: "1", image: vitaminb12, path: "vitamin-b12"},
        {name: "C - Reactive Protein CRP (Quantitative)", file: creactive, button: "C - Reactive Protein CRP", query: "C-reactive_protein", testnumber: "1", image: creactiveprotein, path: "C-reactive-protein"},
        {name: "Uric Acid - Serum", file: uricacid, button: "Uric Acid - Serum", query: "Uric_acid", testnumber: "1", image: uric, path: "uric-acid"},
        {name: "Rheumatoid Factor (RA) Quantitative", file: ra, button: "Rheumatoid Factor (RA) Quantitative", query: "Rheumatoid_factor", testnumber: "1", image: rheuma, path: "rheumatoid-factor"},
    ]

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
      <Box width="90%" margin="auto">
      <StyledSlider {...settings}>
      {laboratoryTests.map((test) => 
            <Box bgcolor= {theme.palette.mode === "dark" ? "black" : "white"} border={theme.palette.mode === "dark" ? "1px solid rgb(255,255,255,0.3)" : "1px solid rgb(0,0,0,0.2)"} marginTop={2}>
            <Box display="flex">
                <Box>
                    <Box display="flex" flexDirection="column">
                        <Typography style={{fontSize: "1.2rem"}} m={2} marginBottom={0} marginRight={0} minWidth={270}>
                            {test.name}
                        </Typography>
                        <Typography m={2} marginBottom={0} marginTop={1} style={{color: "#9c9c9c"}}>
                            {test.testnumber} tests included
                        </Typography>
                    </Box>
                    <Button
                onClick={() => {
                  dispatch(setTestData(test))
                  navigate(test.path)
                }}
                sx={{
                  margin: "2rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  alignSelf: "flex-end",
                  p: "0.5rem",
                  width: "180px",
                  fontSize: "1rem",
                  backgroundColor: "#ff5454",
                  color: theme.palette.background.alt,
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "#910000" : "#ffbab5",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000"
                  }
                }}
              >
                <Typography>
                  VIEW
                </Typography>
              </Button>
                </Box>
                <Box p={1} m={2} height={60}>
                    <img src={test.image} width={40}/>
                </Box>
            </Box>
          </Box>
      )}
      </StyledSlider>
      </Box>
      </Box>
  )
}

export default LabTests
