'use client';

import { Box, Typography } from '@mui/material';
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
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
        Sign In
      </Typography>
      <Box
        width="100%"
        maxWidth="400px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </Box>
    </Box>
  );
};

export default SignInPage;
