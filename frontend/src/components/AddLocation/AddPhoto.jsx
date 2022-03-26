import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { DropzoneArea } from 'material-ui-dropzone';

const theme = createTheme();

export default function AddPhoto(props) {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h6">
            Add a location and a brief description and picture of that location so that others can see. 
          </Typography>


          <Grid item xs={12} sm={6}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                margin="normal"
                id="title"
                label="Title or name of the location"
                name="title"
                onChange={(event) => props.setEvent({...props.event, title: event.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="description"
                name="description"
                required
                label="Brief description of the location"
                multiline
                rows={4}
                fullWidth
                onChange={(event) => props.setEvent({...props.event, description: event.target.value})}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Rating
                name="rating"
                value={props.event.rating}
                onChange={(event) => props.setEvent({...props.event, rating: event.target.value})}
              />
            </Grid> */}

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="is_dangerous" color="primary" checked={props.event.is_dangerous} onChange={(event) => props.setEvent({...props.event, is_dangerous: event.target.checked})} />}
                label="Potentially dangerous location"
              />
            </Grid>

            <Grid item xs={12}>
              <DropzoneArea name="images" filesLimit={20} onChange={(files) => props.onFileChange(files)} />
            </Grid>

          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}