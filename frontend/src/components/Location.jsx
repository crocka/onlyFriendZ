import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RoomIcon from '@mui/icons-material/Room';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

export default function Location() {
  return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <RoomIcon />
              </Avatar>
              <img src='https://cdn-cloudfront.cfauthx.com/binaries/content/gallery/cw-en-ca/logos/park/canadas-wonderland-header-logov3.png' />
              <Typography component="h1" variant="h5">Location</Typography> 
              <div class='location'>Wonderland</div>
              <Typography component="h1" variant="h5">Rating</Typography>
              <Rating name="rating" defaultValue={5} precision={0.5} readOnly/>
              <Typography component="h1" variant="h5">Description</Typography> 
              <div class='description'>Theme park with rides, carnival games, and more!</div>
              <Typography component="h1" variant="h5">Coordinates</Typography> 
              <div class='long-lat'>43.8430, 79.5395</div>
            </Box>
          </Container>
        </ThemeProvider>


  );
}