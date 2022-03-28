import React, { useState } from 'react';
import useApplicationData from '../hooks/useApplicationData';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Dialog,
  DialogContent
} from '@mui/material/';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DropzoneArea } from 'material-ui-dropzone';
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

export default function SignUp() {
  const { createUser } = useApplicationData();
  const [value, setValue] = useState(new Date());
  const [file, setFile] = useState([]);
  const [scroll, setScroll] = useState('paper');
  const [open, setOpen] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState(false);
  const history = useHistory();

  function handleClose() {
    setOpen(false);
  };

  function resetErrors() {
    setErrors(false);
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  };
    
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = `${data.get('firstName')} ${data.get('lastName')}`;

    data.append("name", name);

    for(let i = 0 ; i< file.length; i++) {
      data.append(`images[]`, file[i]);
    }

    validate(data) ? 
    createUser(data)
      .then(res => {
        history.push('/')
      })
      .catch(err => {setErrors(true)})
      :
      setErrors(true);
  };

  const onFileChange = event => {
    setFile([...event]);
  };

  const validate = (data) => {
    if (data.get('firstName').trim() === '' || data.get('lastName').trim() === '' || data.get('email_address').trim() === '' || data.get('password').trim() === '' || data.get('password_confirmation').trim() === '' || data.get('password').trim() !== data.get('password_confirmation').trim() || data.get('summary').trim() === '') {
      return false;
    } else {
      return true;
    }
  }
  
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={errors}
                  onClick={resetErrors}
                  value={firstName}
                  onChange={(e) => {setFirstName(e.target.value)}}
                />
                  {errors.firstName && <p>{errors.firstName}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={errors}
                    onClick={resetErrors}
                    value={lastName}
                    onChange={(e) => {setLastName(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email_address"
                    autoComplete="email"
                    error={errors}
                    onClick={resetErrors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Birthdate"
                      inputFormat="yyyy-MM-dd"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField error={errors}
                      required {...params} name='birthday'/>}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={errors}
                    onClick={resetErrors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Confirm password"
                    type="password"
                    id="password_confirmation"
                    autoComplete="confirm password"
                    error={errors}
                    onClick={resetErrors}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="summary"
                    name="summary"
                    required
                    label="Brief summary of yourself"
                    error={errors}
                    onClick={resetErrors}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <DropzoneArea name="images" filesLimit={20} onChange={(files) => onFileChange(files)} />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <br />
                {errors && <tag style={{color:"red"}}>Please fill out the required fields!</tag>}
              <Button
                onClick={validate}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" onClick={() => history.push('/signin')} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </DialogContent>
    </Dialog>
  );
}