import Map from '../Map.jsx';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import LocationMarker from './LocationMarker.jsx';


const theme = createTheme();

export default function ChooseLocation(props) {

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
            <img
              src="images/logo.png"
              alt="new"
              width="100%"
              height="100%"
            />
          </Avatar>

          <Typography component="h1" variant="h5">
            Tell us about your photos. If the security of the place is concerning, please let us know by checking the corresponding checkbox. All photos must be suitable to view by all ages. Any photo or text that violate the requirements will be subject to further investigation by the CIA and FBI. Message brought to you by RCMP.
          </Typography>

          <Box component="form" noValidate onSubmit={props.handleSubmit} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title or name of the location"
                  name="title"
                />
              </Grid>

              <Grid item xs={12}>

                <Map>
                  <LocationMarker position={props.position} setPosition={props.setPosition} />
                </Map>
                
              </Grid>

            </Grid>


          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}