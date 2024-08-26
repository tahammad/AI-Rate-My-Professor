'use client';

import { Box, Button, Typography, Stack } from '@mui/material';
import { SignIn, SignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/chat');
    return null;
  }

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
        Welcome to AI Rate My Professor!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please sign in or sign up to start using the application.
      </Typography>
      <Stack direction="column" spacing={2} alignItems="center">
        <Button
          variant="contained"
          onClick={() => router.push('/sign-in')}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/sign-up')}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
