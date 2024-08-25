'use client'
import { Box, Button, Stack, TextField, Grid, useMediaQuery, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme to override default global styles
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0, // Remove default margin from the body
        },
        html: {
          margin: 0, // Remove default margin from the html
          height: '100%', 
          boxSizing: 'border-box', 
        },
        '#__next': {
          height: '100%',
        },
      },
    },
  },
});

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');

  // Media query to check if the device is mobile
  const isMobile = useMediaQuery('(max-width:600px)');

  const sendMessage = async () => {
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
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingX={isMobile ? 1 : 2} // Adjust padding for different screen sizes
      >
        <Grid
          container
          direction="column"
          spacing={3}
          sx={{
            width: isMobile ? '90%' : '500px', // Responsive width
            height: isMobile ? '80%' : '700px', // Responsive height
          }}
        >
          <Grid
            item
            xs
            sx={{
              overflow: 'auto',
              maxHeight: '100%',
              flexGrow: 1,
            }}
          >
            <Stack direction={'column'} spacing={2}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === 'assistant' ? 'flex-start' : 'flex-end'
                  }
                >
                  <Box
                    sx={{
                      bgcolor:
                        message.role === 'assistant'
                          ? 'primary.main'
                          : '#333333',
                      color: 'white',
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item>
            <Stack direction={'row'} spacing={2}>
              <TextField
                label="Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <Button variant="contained" onClick={sendMessage}>
                Send
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
