import React, { useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import StyledIconButton from '../ui/overrides/IconButton';
import LoginForm from '../components/LoginForm';
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()

    const handleForgotPasswordClick = () => {
        navigate('/forgot-password'); // Redirect to the Forgot Password page
      };
    const [isSignup, setIsSignup]= useState(false)

    const handleIsSignupPage = (val)=>{
        setIsSignup(val)

    }
  return (
    <Stack
      sx={{
        display: 'flex',
        p: 0,
        height: '100vh', // Ensure full viewport height
        backgroundImage: `url(/LoginBackground.svg)`, // Set background image
        backgroundSize: 'cover', // Make the image cover the entire area
        backgroundPosition: 'right', // Center the background image
        backgroundRepeat: 'no-repeat' // Prevent the image from repeating
      }}>
      <Box  width={'40%'} height={'100%'}  display={'flex'} flexDirection={'column'}  justifyContent={"center"} alignItems={"center"} >
       <Box display={"flex"} flexDirection={"column"} width={"90%"} gap={3} padding={3} >
       <Box display="flex" gap={1} alignItems="center">
          <img height={40} src={`./image2.png`} />
          <Typography variant="h5" color="white">
            Crypto+ bubble
          </Typography>
        </Box>
       {
        isSignup ?(
            <Typography variant="h3" color="white" width={"100%"}>
            Create New Account
          </Typography>
        ):(
            <Typography variant="h3" color="white" width={"100%"}>
            Welcome Back
          </Typography>
        )
       }

        <Box p={1} display={'flex'} flexDirection={'column'} width={'100%'} gap={1} padding={0}>
          <Typography variant="subtitle" color="#A9A9A9">
            Log in with your social media
          </Typography>
          <Grid display={'flex'} gap={2}>
            <StyledIconButton sx={{ height: '100%', width: 'fit-content', backgroundColor: '#2A2E36' }}>
              <img height={25} src="Social Media.png" alt="" />
            </StyledIconButton>
            <StyledIconButton sx={{ height: '100%', width: 'fit-content', backgroundColor: '#2A2E36' }}>
              <img height={25} src="Social Media (1).png" alt="" />
            </StyledIconButton>
            <StyledIconButton sx={{ height: '100%', width: 'fit-content', backgroundColor: '#2A2E36' }}>
              <img height={25} src="Social Media (2).png" alt="" />
            </StyledIconButton>
          </Grid>
        </Box>
        <Box width={'100%'} border={'2px solid #2A2E36'}></Box>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="subtitle" color="#A9A9A9">
            Or log in with your email.
          </Typography>
          <Typography onClick={handleForgotPasswordClick} variant="subtitle" color="#A9A9A9">
            Forgot Password?
          </Typography>
        </Box>
        <LoginForm isSignupPage={handleIsSignupPage} />

       </Box>
      </Box>
    </Stack>
  );
};

export default LoginPage;
