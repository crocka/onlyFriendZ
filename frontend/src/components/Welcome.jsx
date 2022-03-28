import React, { useState } from 'react';
import {
  Link,
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  Dialog,
  DialogContent
} from '@mui/material/';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        onlyFriendZ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Welcome() {
  const [scroll, setScroll] = useState('paper');
  const [open, setOpen] = useState(true);
  const history = useHistory()

  function handleClose() {
    setOpen(false);
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      disableEnforceFocus
    >
      <DialogContent dividers={scroll === 'paper'}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              }}
            >
          <img 
            src="images/logo.png"
            alt="new"
            width= "100%"
            height= "100%"
          />
          <h1>You feeling lonely today?</h1>
          <Typography component="h1" variant="h5">
            Join OnlyFriendZ!
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => history.push('/signin')}
            >
              Sign in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </DialogContent>
    </Dialog>
  );
}