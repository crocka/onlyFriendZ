import Map from '../Map.jsx';
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import LocationMarker from './LocationMarker.jsx';

import {
  Marker
} from 'react-leaflet';

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

          <Typography component="h1" variant="h6">
            Please click on the map below to select the exact location. You may enlarge the map to select as precise as possible.
          </Typography>

          <Grid item xs={12} sm={6}>

            <Map style={{ height: "650px", width: "550px" }}>
              <LocationMarker setPosition={(position) => props.setEvent({...props.event, position: position})}></LocationMarker>
              <Marker position={[props.event.position.lat, props.event.position.lng]}>
              </Marker>
            </Map>

          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}