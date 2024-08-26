'use client';

import { Box, Typography } from '@mui/material';
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box
        width="100%"
        maxWidth="400px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </Box>
    </Box>
  );
};

export default SignUpPage;
