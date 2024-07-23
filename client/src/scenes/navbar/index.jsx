import { useState, useCallback } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Menu, Close, Science } from "@mui/icons-material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ScienceIcon from '@mui/icons-material/Science';
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import { AsyncPaginate } from "react-select-async-paginate"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setMedName } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const [search, setSearch] = useState(null);
    const [drugOptions, setDrugOptions] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    console.log(search);
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const loadOptions = async (inputValue) => {
        const response = await fetch(`https://api.fda.gov/drug/drugsfda.json?search=${inputValue}&limit=4`)
      const response_1 = await response.json()
      return {
        options: response_1.results.map((result) => {
        console.log(result);
          return {
            label: result.products[0].active_ingredients[0].name,
            strength: result.products[0].active_ingredients[0].strength,
            brand: result.products[0].brand_name,
            dose: result.products[0].dosage_form,
            route: result.products[0].route,
            sponsor: result.sponsor_name,
            productid: result.products[0].product_number
          }
        }),
      }
      };

      const customStyles = {
        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: theme.palette.mode === "light" ? "rgb(255, 255, 255)" : alt
          
        }),
        placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color: theme.palette.mode === "light" ? "black" : "white",
            zIndex: 100,
            position: "relative"
        }),
        input: (defaultStyles) => ({
            ...defaultStyles,
            width: "390px",
            color: theme.palette.mode === "light" ? "black" : "white",
        }),
        singleValue: (defaultStyles) => ({
            ...defaultStyles,
            color: theme.palette.mode === "light" ? "black" : "white",
            zIndex: 1,
            position: "fixed"
        }),
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            backgroundColor: "rgb(255, 255, 255)",
            color: "black",
            fontFamily: "Rubik, sans-serif",
            "&:hover":{
                backgroundColor: "#29bfff"
            },
        }),
        
      }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        dispatch(setMedName({medname: searchData}));
        navigate("/medicine");
    }

    return (
        <FlexBetween padding="0.75rem 3%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <img src={theme.palette.mode === "dark" ? dlogo : logo} width={140} onClick={() => navigate("/")} style={{cursor: "pointer"}}/>
                {isNonMobileScreens && (
                    <Box>
                        <AsyncPaginate
                        styles={customStyles}
                        placeholder="Search for Medicines/Healthcare products/Pharmaceuticals"
                        debounceTimeout={600}
                        value={search}
                        onChange={handleOnChange}
                        loadOptions={loadOptions}
                        />
                    </Box>
                )}
            </FlexBetween>

            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <Tooltip title="Dark Mode"><DarkMode sx={{ fontSize: "25px" }} /></Tooltip>
                        ): (
                            <Tooltip title="Light Mode"><LightMode sx={{ color: dark, fontSize: "25px" }}/></Tooltip>
                        )}
                    </IconButton>
                    <IconButton onClick={() => navigate("/blood-donation")}>
                        <Tooltip title="Blood Donation"><BloodtypeIcon sx={{ color: "#ff0000", fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => console.log("Blood Donation")}>
                        <Tooltip title="Notifications"><Notifications sx={{ color: theme.palette.mode === "dark" ? "" : dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate("/medical-services")}>
                        <Tooltip title="Doctor's Appointment"><MedicalServicesIcon sx={{ color: theme.palette.mode === "dark" ? "" : dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate("/buy-medicines")}>
                        <Tooltip title="Buy Medicines"><LocalMallIcon sx={{ color: theme.palette.mode === "dark" ? "" : dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate("/lab-tests")}>
                        <Tooltip title="Lab Tests"><ScienceIcon sx={{ color: theme.palette.mode === "dark" ? "" : dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate("/medicines-cart")}>
                        <Tooltip title="Medicines Cart"><ShoppingCartIcon sx={{ color: theme.palette.mode === "dark" ? "" : dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>

                    
                    
                    {user ? (<FormControl variant="standard" value={user.firstName}>
                        <InputLabel>{user.firstName}</InputLabel>
                        
                        <Select
                        value="Name"
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",

                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            } 
                        }}
                        renderValue={() => {
                              return <em>Signed in</em>;
                        }}
                        >   
                            
                            <MenuItem value={user.firstName}>
                                <Typography>
                                    {user.firstName}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {dispatch(setLogout()); navigate("/login")} }>Log Out</MenuItem>
                        </Select>
                    </FormControl>) : (
                        <Button variant="contained" onClick={() => navigate("/login")} sx={{
                            backgroundColor: background,
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "#4f4f4f" : "#c7e4ff"
                        }
                        }
                        
                        }>
                            <Typography>
                            Sign in
                            </Typography>
                        </Button>
                    )}
                    
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu/>
                </IconButton>
            )}

            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box position="fixed" 
                right="0" 
                bottom="0" 
                height="100%" 
                zIndex="10" 
                maxWidth="500px" 
                minWidth="300px" 
                backgroundColor={background}
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton 
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        > 
                            <Close/>
                        </IconButton>
                    </Box>

                    <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <Tooltip title="Dark Mode"><DarkMode sx={{ fontSize: "25px" }} /></Tooltip>
                        ): (
                            <Tooltip title="Light Mode"><LightMode sx={{ color: dark, fontSize: "25px" }}/></Tooltip>
                        )}
                    </IconButton>
                    <IconButton onClick={() => console.log("Blood Donation")}>
                        <Tooltip title="Blood Donation"><BloodtypeIcon sx={{ color: dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => console.log("Blood Donation")}>
                        <Tooltip title="Notifications"><Notifications sx={{ color: dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    <IconButton onClick={() => console.log("Blood Donation")}>
                        <Tooltip title="Doctor's Appointment"><MedicalServicesIcon sx={{ color: dark, fontSize: "25px" }} /></Tooltip>
                    </IconButton>
                    
                    
                    {user ? (<FormControl variant="standard" value="Ed">
                        <InputLabel>RITESH</InputLabel>
                        
                        <Select
                        value="Name"
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",

                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight
                            } 
                        }}
                        renderValue={() => {
                              return <em>Signed in</em>;
                        }}
                        >   
                            
                            <MenuItem value="ritsh">
                                <Typography>
                                    Ritesh
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                dispatch(setLogout())
                                navigate("/login")
                                }}>Log Out</MenuItem>
                        </Select>
                    </FormControl>) : (
                        <Button variant="contained" onClick={() => navigate("/login")} sx={{
                            backgroundColor: background,
                            color: theme.palette.mode === "dark" ? dark : "#111",
                            "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "#4f4f4f" : "#c7e4ff"
                        }
                        }
                        
                        }>
                            <Typography>
                            Sign in
                            </Typography>
                        </Button>
                    )}
                    
                </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    )
}

export default Navbar;