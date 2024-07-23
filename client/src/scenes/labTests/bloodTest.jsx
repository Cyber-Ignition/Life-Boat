import React, { useState, useEffect } from 'react'
import { Box, IconButton, useTheme, InputBase, Typography, Button, Slide } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { Search } from '@mui/icons-material';
import BiotechIcon from '@mui/icons-material/Biotech';
import logo from "components/images/logo.png";
import dlogo from "components/images/dlogo.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BloodTest = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const neutralLight = theme.palette.neutral.light;
  const [labTestInfo, setLabTestInfo] = useState(null);

  async function getWikiResponse(url, config) {
    const res = await axios.get(url, config);
    return res;
  };
  useEffect(() => {
      const WIKI_URL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=3&exintro&titles=Complete_blood_count&explaintext=1&format=json&formatversion=2&origin=*`
      const wikiConfig = {
        timeout: 6500 * 6500
    };
      getWikiResponse(WIKI_URL, wikiConfig).then(result => {
      setLabTestInfo(result.data.query.pages[0].extract);
    })
  }, []);

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
      <Box display="flex">
        <Box p={1} m={2} width="40%" bgcolor="white">
          <Box marginBottom={2}>
            <Typography style={{fontSize: "2rem"}}>
                Complete Blood Count (CBC)
            </Typography>
          </Box>
          <Typography>
            {labTestInfo}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" p={1} m={2} bgcolor="white" width="50%">
          <Box marginRight="auto" marginLeft="auto" display="flex">
            <BiotechIcon style={{fontSize: "3rem"}}/>
            <Typography mx={2} style={{fontSize: "2rem"}}>
              Test(s) included (29)
            </Typography>
          </Box> 
        </Box>
      </Box>
    </Box>
  )
}

export default BloodTest
