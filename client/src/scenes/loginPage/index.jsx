import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <Box width="100%" backgroundColor= {theme.palette.background.alt} p="1rem 6%">
                <img src={theme.palette.mode === "dark" ? dlogo : logo} width={140} style={{cursor: "pointer", display: "Block", marginLeft: "auto", marginRight: "auto"}}/>
            </Box>
            <Box
            width={isNonMobileScreens ? "75%" : "95%"}
            p="1rem"
            m="1rem auto"
            borderRadius="1rem"
            backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" textAlign="center" display="flex" flexDirection="column">
                    <text>Welcome to Lifeboat</text>
                    <text>Why Lifeboat? Because your health is our priority...</text>
                </Typography>
                <Form/>
            </Box>
            
        </Box>
    )
}

export default LoginPage;