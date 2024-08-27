'use client';
import { useState } from 'react';
import { Box, Button, Stack, TextField, AppBar, Toolbar, Typography, IconButton, CssBaseline, createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { SignIn, SignUp, useAuth, UserButton } from '@clerk/nextjs';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  const { isSignedIn } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#303030' : '#fafafa', 
      },
      primary: {
        main: '#1976d2', 
      },
      secondary: {
        main: '#ff9800', 
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const sendMessage = async () => {
    if (!isSignedIn) {
      alert('Please sign in to send a message.');
      return;
    }

    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Rate My Professor
            </Typography>
            <Button color="inherit" onClick={handleThemeChange}>
              Toggle Dark Mode
            </Button>
            {isSignedIn && (
              <Button color="inherit" href="/account">
                <UserButton />
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          {!isSignedIn ? (
            <Stack direction="column" spacing={3}>
              <SignIn />
              <SignUp />
            </Stack>
          ) : (
            <Stack
              direction={'column'}
              width={isMobile ? '90%' : '500px'}  
              height={isMobile ? '80vh' : '700px'}  
              border="1px solid black"
              p={2}
              spacing={3}
            >
              <Stack
                direction={'column'}
                spacing={2}
                flexGrow={1}
                overflow="auto"
                maxHeight="100%"
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={
                      message.role === 'assistant' ? 'flex-start' : 'flex-end'
                    }
                  >
                    <Box
                      bgcolor={
                        message.role === 'assistant'
                          ? 'primary.main'
                          : 'secondary.main'
                      }
                      color="white"
                      borderRadius={16}
                      p={3}
                    >
                      {message.content}
                    </Box>
                  </Box>
                ))}
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <TextField
                  label="Message"
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" onClick={sendMessage}>
                  Send
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
