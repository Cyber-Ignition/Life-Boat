import { Box, Typography, useTheme, useMediaQuery, IconButton, InputBase, Button } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Search } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useState } from 'react'
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

const UploadPrescription = () => {
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [picture, setPicture] = useState(null);
    const [IsFullScreen, setFullScreen] = useState(false);
    const navigate = useNavigate();
    const handleFormSubmit = async(values, onSubmitProps) => {
        console.log(values);
    };
    const handle = useFullScreenHandle();
    console.log(handle);
    return (

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
                <Box
                width={isNonMobileScreens ? "40%" : "95%"}
                height="40%"
                >
                    <Box backgroundColor={theme.palette.background.alt} m="1rem" p="1rem" border={`1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`}>
                        <Typography fontWeight="500" variant="h5" display="flex" flexDirection="column">
                            <p style={{marginBlockEnd: "0rem"}}>Continue to upload images of your prescription below</p>
                            <p style={{fontSize: "0.75rem", fontWeight: "100", marginBlockEnd: "0rem"}}>(Accepted Formats: JPG/JPEG/PNG)</p>
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
                                {values.picture1 ? (
                                    <FlexBetween>
                                        <Typography>{values.picture1.name}</Typography>
                                        <EditOutlinedIcon/>
                                    </FlexBetween>
                                ) : (
                                    <Box>
                                    <CloudUploadIcon style={{fontSize: "2rem", marginLeft: "1rem", marginTop: "1rem"}}/>
                                    <Box display="flex">
                                    <p style={{fontSize: "1rem", marginLeft: "1rem", marginBlockStart: "0.5rem"}}>Upload Prescription Here</p>
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
                                {values.picture2 ? (
                                    <FlexBetween>
                                        <Typography>{values.picture2.name}</Typography>
                                        <EditOutlinedIcon/>
                                    </FlexBetween>
                                ) : (
                                    <Box>
                                    <CloudUploadIcon style={{fontSize: "2rem", marginLeft: "1rem", marginTop: "1rem"}}/>
                                    <Box display="flex">
                                    <p style={{fontSize: "1rem", marginLeft: "1rem", marginBlockStart: "0.5rem"}}>Upload E-Prescription</p>
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
                <Button
                        type="submit"
                        sx = {{
                            m: "2rem 1rem",
                            p: "1rem",
                            backgroundColor: "#2c79f5",
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.mode === "dark" ? "#001f91" : "#cfe2ff",
                                color: theme.palette.mode === "dark" ? "#fff" : "#000"
                            }
                        }}
                        >PROCEED</Button>
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
                        <img src={doctor} width="50px" />
                        <Typography p="1rem">- Doctor Details</Typography>
                        <img src={date} width="50px" />
                        <Typography p="1rem">- Date of Prescription</Typography>
                    </Box>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={patient} width="50px" />
                        <Typography p="1rem">- Patient Details</Typography>
                        <img src={sign} width="50px" />
                        <Typography p="1rem">- Doctor's Signature</Typography>
                    </Box>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={medicine} width="50px" />
                        <Typography p="1rem">- Medicine Details</Typography>
                    </Box>
                    <Box display="flex" paddingBottom="1rem">
                        <img src={dosage} width="50px" />
                        <Typography p="1rem">- Dosage Details</Typography>
                    </Box>
                </Box>
                <Box marginLeft="2rem">
                    <Typography p="1.5rem" textAlign="center">Valid Prescription Sample</Typography>
                    <Box>
                        <img src={presctemp} width={300} onClick={handle.enter} style={{cursor: "pointer"}}/>
                    </Box>
                </Box>
                </Box>
                <Box display={handle.active ? "" : "none"}>
                <FullScreen handle={handle}>
                    <Box height= "100%" alignItems="center">
                        <img src={presctemp} height="100%" style={{ display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                    </Box>
                </FullScreen>
                </Box>
                
            </Box>
            
    )
}

export default UploadPrescription;
