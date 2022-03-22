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

  const handleSubmit = (event) => {

    const data = new FormData(event.currentTarget);

    props.setPosition({


      longitude: data.get('longitude'),
      latitude: data.get('latitude')

    });

  };

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
            Please click on the map below to select the exact location. You may enlarge the map to select as precise as possible.
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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

              {/* <Grid item xs={12}>

                <Map>
                  <LocationMarker position={props.position} setPosition={props.setPosition} />
                </Map>
                
              </Grid>

              </Grid> */}

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title or name of the location"
                  name="longitude"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title or name of the location"
                  name="latitude"
                />
              </Grid>

            </Grid>


          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}