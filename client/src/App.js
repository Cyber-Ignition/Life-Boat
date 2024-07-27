import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import UploadPrescription from "scenes/uploadPresciption";
import BloodDonation from "scenes/bloodDonation";
import MedicalServices from "scenes/medicalServices";
import BuyMeds from "scenes/buyMeds";
//import Navbar from "scenes/navbar";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Medicine from "scenes/medicine";
import MedicinesCart from "scenes/medicinesCart";
import LabTests from "scenes/labTests";
import Test from "scenes/labTests/Test";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile/:userId" element={<ProfilePage/>} />
          <Route path="/upload-prescription" element={<UploadPrescription/>} />
          <Route path="/blood-donation" element={<BloodDonation/>} />
          <Route path="/medical-services" element={<MedicalServices/>} />
          <Route path="/buy-medicines" element={<BuyMeds/>} />
          <Route path="/medicine" element={<Medicine/>} />
          <Route path="/medicines-cart" element={<MedicinesCart/>} />
          <Route path="/lab-tests" element={<LabTests/>} />
          <Route path="/lab-tests/:id" element={<Test/>} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
