import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme, useMediaQuery, IconButton, InputBase, Button } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import { Search } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";
import doctor from "components/images/doctor.png";
import patient from "components/images/patient.png";
import medicine from "components/images/medicine.png";
import dosage from "components/images/dosage.png";
import date from "components/images/date.png";
import sign from "components/images/sign.png";
import presctemp from "components/images/prescription-templates/presctemp.png";
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from "yup";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Tesseract from 'tesseract.js';
import { BarLoader } from 'react-spinners';
import drugsfda from "../../components/drugData/data/drugs.txt";
import { useDispatch } from 'react-redux';
import { setCartItem } from 'state';
import "./presc.css";

const _ = require('lodash');

const initialValues = yup.object().shape({
    picture1: "",
    picture2: "",
    pictures: ""
})

const validationSchema = yup.object().shape({
    picture1: yup.string(),
    picture2: yup.string(),
    pictures: yup.string().required()
    
})

const override = {
    marginTop: "0.6rem",
    marginLeft: "0.5rem"
};

const UploadPrescription = () => {
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [picture, setPicture] = useState(null);
    const [picturePath, setPicturePath] = useState(null);
    const [imageText, setImageText] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [drugList, setDrugList] = useState(null);
    const [displayFooter, setDisplayFooter] = useState(false);
    const [drugsAddedtoCart, setDrugsAddedToCart] = useState(false);
    const drugListFinal = [];
    const drugsDetected = [];

    useEffect(() => {
        fetch(drugsfda)
        .then(r => r.text())
        .then(text => setDrugList(text.split("\n")));
    }, []);
    if (drugList){
        drugList.map((obj) => drugListFinal.push(obj.split("\r")[0].split(" ")[0]));
    }
    const handleImageUpload = async () => {
        setSubmitClicked(true);
        const formData = new FormData();
        formData.append('file', picture);
        formData.append('upload_preset', 'lifeboat-react-uploads-unsigned');
        formData.append('apikey', process.env.CLOUDINARY_API_KEY);
        const results = fetch("https://api.cloudinary.com/v1_1/dlnakx05c/image/upload", {
            method: "POST",
            body: formData
        })
        const response = results.then(res => res.json())
        response.then((object) => setPicturePath(object.secure_url))
    }

    const handleCancel = () => {
        setSubmitClicked(false);
        setImageText(null);
        setPicturePath(null);
        setPicture(null);
    }

    if (picturePath){
        Tesseract.recognize(picturePath, 'eng').then(({ data: { text }}) => {
            setImageText(text);
        })
    }

    if (imageText){
        const imageTextN = imageText.replaceAll(" ", "\n").replaceAll("'", "").replaceAll("1", "I");
        const imageTextArr = imageTextN.split("\n");
        imageTextArr.map((text) => drugListFinal.includes(text) && text !== "" ? drugsDetected.push(text) : null);
    }
    console.log(imageText);

    const handleConfirmUpload = () => {
        setDrugsAddedToCart(true);
        drugsDetected.map((drug) => dispatch(setCartItem({name: _.startCase(_.toLower(drug)), price: "5"})));
        setDisplayFooter(true);
    }
    
    const navigate = useNavigate();
    const handleFormSubmit = async(values, onSubmitProps) => {
        console.log(values);
    };
    const handle = useFullScreenHandle();
    console.log(drugsDetected);
    return (

        <Box>
                <Box width="100%" backgroundColor= {theme.palette.background.alt} p="1rem 6%">
                    <FlexBetween>
                        <img src={theme.palette.mode === "dark" ? dlogo : logo} alt="logo" width={170} onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
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
                <Box
                width={isNonMobileScreens ? "40%" : "95%"}
                height="40%"
                >
                    <Box backgroundColor={theme.palette.background.alt} m="1rem" p="1rem" border={`1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`}>
                        <Typography display="flex" flexDirection="column">
                            <Typography fontWeight={500} variant='h5' marginY={2}>Continue to upload images of your prescription below</Typography>
                            <Typography style={{fontSize: "0.75rem", fontWeight: "100"}}>(Accepted Formats: JPG/JPEG/PNG)</Typography>
                        </Typography>
                    </Box>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
                >
                    {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column">
                <FlexBetween>
                <Box
                width={250}
                backgroundColor= {theme.palette.mode === "light" ? "#fff" : "#000"}
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            setFieldValue("picture1", acceptedFiles[0])
                            setFieldValue("pictures", acceptedFiles[0])
                            setPicture(acceptedFiles[0])
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Box
                                {...getRootProps()}
                                border={`2px solid #0037ff`}
                                sx={{
                                    "&:hover": { cursor: "pointer"}
                                }}
                            >
                                <input {...getInputProps()} />
                                {values.picture1 && picture ? (
                                    <FlexBetween>
                                        <Typography>{values.picture1.name}</Typography>
                                        <EditOutlinedIcon/>
                                    </FlexBetween>
                                ) : (
                                    <Box>
                                    <CloudUploadIcon style={{fontSize: "2rem", marginLeft: "1rem", marginTop: "1rem"}}/>
                                    <Box display="flex">
                                    <Typography style={{fontSize: "1rem", marginLeft: "1rem", marginBottom: "1rem", marginTop: "0.5rem"}}>Upload Prescription Here</Typography>
                                    <ArrowForwardIcon style={{marginTop: "0.5rem", marginLeft: "1rem"}}/>
                                    </Box>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Dropzone>
                </Box>
                
                <Box
                width={250}
                backgroundColor= {theme.palette.mode === "light" ? "#fff" : "#000"}
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            setFieldValue("picture2", acceptedFiles[0])
                            setFieldValue("pictures", acceptedFiles[0])
                            setPicture(acceptedFiles[0])
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Box
                                {...getRootProps()}
                                border={`2px solid #0037ff`}
                                sx={{
                                    "&:hover": { cursor: "pointer"}
                                }}
                            >
                                <input {...getInputProps()} />
                                {values.picture2 && picture ? (
                                    <FlexBetween>
                                        <Typography>{values.picture2.name}</Typography>
                                        <EditOutlinedIcon/>
                                    </FlexBetween>
                                ) : (
                                    <Box>
                                    <CloudUploadIcon style={{fontSize: "2rem", marginLeft: "1rem", marginTop: "1rem"}}/>
                                    <Box display="flex">
                                    <Typography style={{fontSize: "1rem", marginLeft: "1rem", marginBottom: "1rem", marginTop: "0.5rem"}}>Upload E-Prescription</Typography>
                                    <ArrowForwardIcon style={{marginTop: "0.5rem", marginLeft: "1rem"}}/>
                                    </Box>
                                    </Box>
                                )}
                            </Box>
                            
                        )}
                    </Dropzone>
                    
                </Box>
                
                </FlexBetween>
                {errors.pictures &&
                <Typography color="#ff3333" marginLeft="1rem">
                    Please upload an image to proceed.
                </Typography>
                }
                {submitClicked ? Boolean(errors.pictures) ? setSubmitClicked(false) : null || Boolean(picturePath) || <Typography display="flex" marginLeft={2} marginTop={2}>
                    Uploading Image
                    <BarLoader
                        color="blue"
                        loading={true}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    </Typography> : null}
                {picturePath ? Boolean(imageText) || <Typography display="flex" marginLeft={2} marginBottom={2} marginTop={2}>
                    Extracting text from image
                    <BarLoader
                        color="blue"
                        loading={true}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    </Typography> : null}
                    {picturePath && <Box marginLeft="2rem" display="flex" marginTop={2}>
                        <img src = {picturePath} alt="picture-path" width="200px"/>
                        <Box display="flex" flexDirection="column">
                        {drugsDetected.length > 0 && <Typography p={4} style={{fontSize: "1rem"}}>
                            The following drugs were detected by our system:
                            </Typography>
                        }
                        {drugsDetected.length > 0 && drugsDetected.map((item) => 
                            <Box display="flex">
                            <Typography minWidth={250} marginLeft="2rem" style={{color: theme.palette.mode === "dark" ? "#7dc0ff" : "#0084ff"}}>
                                {item}
                            </Typography>
                            <Box>
                            <CheckIcon/>
                            </Box>
                            </Box>
                        )}
                        </Box>
                    </Box>}
                    
                {Boolean(picturePath) && <Button
                        onClick={() => {
                            drugsAddedtoCart ? setErrorMessage("This order has already been added") : handleConfirmUpload()
                        }}
                        sx = {{
                            m: errorMessage ? "1rem" : "2rem 1rem",
                            p: "1rem",
                            backgroundColor: "#2c79f5",
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#cfe2ff",
                                color: theme.palette.mode === "dark" ? "#fff" : "#000"
                            }
                        }}
                        >{drugsAddedtoCart ? "CONFIRMED" : "CONFIRM UPLOAD"}</Button>}
                {Boolean(picturePath) || <Button
                        onClick={handleImageUpload}
                        sx = {{
                            m: "2rem 1rem",
                            p: "1rem",
                            backgroundColor: "#2c79f5",
                            color: "white",
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#cfe2ff",
                                color: theme.palette.mode === "dark" ? "#fff" : "#000"
                            }
                        }}
                        >PROCEED</Button>}
                        {errorMessage && <Typography marginLeft="1rem" style={{color: "#ff0000"}}>{errorMessage}</Typography>}
                {picturePath && <Button
                        onClick={handleCancel}
                        sx = {{
                            m: "0rem 1rem",
                            p: "1rem",
                            marginBottom: "2rem",
                            backgroundColor: "#e60f00",
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#910000" : "#ffbab5",
                                color: theme.palette.mode === "dark" ? "#fff" : "#000"
                            }
                        }}
                        >CANCEL</Button>}
                </Box>
                </form>
            )}
                </Formik>
                <Typography marginLeft="1rem">
                    Our licensed pharmacists would dispense your medicines shortly after prescription is uploaded, based on product availability
                </Typography>
                </Box>
                <Box marginLeft="2rem">
                    <Typography p="1.5rem">Valid Prescription contains the following elements</Typography>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={doctor} alt="doctor" width="50px" />
                        <Typography p="1rem">- Doctor Details</Typography>
                        <img src={date} alt="date" width="50px" />
                        <Typography p="1rem">- Date of Prescription</Typography>
                    </Box>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={patient} alt="patient" width="50px" />
                        <Typography p="1rem">- Patient Details</Typography>
                        <img src={sign} alt="sign" width="50px" />
                        <Typography p="1rem">- Doctor's Signature</Typography>
                    </Box>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={medicine} alt="medicine" width="50px" />
                        <Typography p="1rem">- Medicine Details</Typography>
                    </Box>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={dosage} alt="dosage" width="50px" />
                        <Typography p="1rem">- Dosage Details</Typography>
                    </Box>
                </Box>
                <Box marginLeft="2rem">
                    <Typography p="1.5rem" textAlign="center">Valid Prescription Sample</Typography>
                    <Box>
                        <img src={presctemp} alt="prescription-sample" width={300} onClick={handle.enter} style={{cursor: "pointer"}}/>
                    </Box>
                </Box>
                </Box>
                <Box display={handle.active ? "" : "none"}>
                <FullScreen handle={handle}>
                    <Box height= "100%" alignItems="center">
                        <img src={presctemp} alt="prescription-template" height="100%" style={{ display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                    </Box>
                </FullScreen>
                </Box>
                
    {displayFooter && <Box className="footer--box" display="flex" alignSelf="center" position="fixed" bottom="0" width="90%" backgroundColor={theme.palette.mode === "light" ? "white" : "black"}
      border={theme.palette.mode === "light" ? "" : "1px solid #595959"} boxShadow= {theme.palette.mode === "light" ? "5px 10px 10px 5px #000" : "5px 10px 10px 10px #fff"}>
        <ShoppingCartCheckoutIcon style={{ fontSize: "1.5rem", marginTop: "3.5rem", marginLeft: "2rem" }} />
        <Typography m="2rem" p="1rem" width={850} style={{ fontWeight: "500", fontSize: "1rem" }}>
          Detected drugs have been added to your cart successfully.
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

export default UploadPrescription;
