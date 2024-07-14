import Navbar from "scenes/navbar";
import { Box, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Navbar/>
            <Box width="100%" p="1rem 6%">
                <Typography textAlign="center" style = {{cursor: "pointer"}}onClick={() => navigate("/upload-prescription")}>
                    Order with prescription - UPLOAD NOW
                </Typography>
            </Box>
        </Box>
        
    )
}

export default HomePage;