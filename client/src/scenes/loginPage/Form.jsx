import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const registerSchema = yup.object().shape({
    firstName: yup.string().min(2).required("required"),
    lastName: yup.string().min(2).required("required"),
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().min(8).required("required"),
    location: yup.string().min(2).required("required"),
    age: yup.number().required("required"),
    bloodGroup: yup.string().min(2).max(3).required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    age: "",bloodGroup: "",

}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => { 
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [msg, setMsg] = useState(null);

    const register = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                headers: { "Content-type" : "application/json"},
                body: JSON.stringify(values),
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-type" : "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        console.log(loggedIn);
        onSubmitProps.resetForm();
        if (loggedIn.user) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/");
        } else {
            setMsg(loggedIn.msg);
            console.log(loggedIn.msg);
        }
    }

    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
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
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4"},
                        }}
                    >

                    {isRegister && (
                        <>
                            <TextField
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx = {{  gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx = {{  gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx = {{  gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Age"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                name="age"
                                error={Boolean(touched.age) && Boolean(errors.age)}
                                helperText={touched.age && errors.age}
                                sx = {{  gridColumn: "span 1.5" }}
                            />
                            <TextField
                                label="Blood Group"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.bloodGroup}
                                name="bloodGroup"
                                error={Boolean(touched.bloodGroup) && Boolean(errors.bloodGroup)}
                                helperText={touched.bloodGroup && errors.bloodGroup}
                                sx = {{  gridColumn: "span 1.5" }}
                            />
                        </>
                    )}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx = {{  gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx = {{  gridColumn: "span 4" }}
                        />
                    </Box>
                    
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx = {{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.mode === "dark" ? "#2c79f5" : palette.primary.main,
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: palette.mode === "dark" ? "#001866" : "#b0f1ff",
                            }
                        }}
                        >

                            {isLogin ? "LOGIN" : "REGISTER"}

                        </Button>
                        <Typography color="#ff3333">
                            {msg || ""}
                            
                        </Typography>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                                setMsg(null);
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: "#2c79f5",
                                "&:hover" : {
                                    cursor: "pointer",
                                    color: palette.mode === "dark" ? "#fff" : "#0077ff",
                                },
                            }}
                        >
                            {isLogin ? "Dont have an account? Sign up here." : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default Form;