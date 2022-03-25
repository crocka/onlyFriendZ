import Map from '../Map.jsx';
import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { MapContainer, TileLayer, Marker } from 'react-leaflet'

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

          <Typography component="h1" variant="h6">
            Please click on the map below to select the exact location. You may enlarge the map to select as precise as possible.
          </Typography>

          <Grid item xs={12} sm={6}>

              <MapContainer doubleClickZoom={false} center={props.initialPos} zoom={13} style={{ backgroundColor: "black", height: "650px", width: "550px" }}>

                <TileLayer
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                  url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                />
                <LocationMarker setPosition={(position) => props.setEvent({ ...props.event, position: position })}></LocationMarker>
                <Marker position={[props.event.position.lat, props.event.position.lng]}>
                </Marker>

              </MapContainer>

          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}