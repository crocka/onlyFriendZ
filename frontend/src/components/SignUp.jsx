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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import useApplicationData from '../hooks/useApplicationData';
import { DropzoneArea } from 'material-ui-dropzone';
import { useHistory } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CropSharp } from '@material-ui/icons';
// const fs = require('fs');

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
  const [value, setValue] = React.useState(new Date());
  const [file, setFile] = React.useState([]);
  const [scroll, setScroll] = React.useState('paper');
  const [open, setOpen] = React.useState(true);
  const history = useHistory()

  function handleClose() {
    setOpen(false);
  };
  

  const Input = styled('input')({
    display: 'none',
  });

  // React.useEffect(() => {

    const handleChange = (newValue) => {
      setValue(newValue);
    };
    
    const handleSubmit = (event) => {

      //:name, :email_address, :password, :password_confirmation, :birthday, :image_url, :instagram_handle, :twitter_handle, :tiktok_handle, :personal_link, :summary
      event.preventDefault();
      // const images = event.currentTarget.images.files; 
      const data = new FormData(event.currentTarget);
      const name = `${data.get('firstName')} ${data.get('lastName')}`;
      data.append("name", name);
      // console.log(Object.keys(event.currentTarget.files.files));
      // let images = [];
      // Object.keys(event.currentTarget.files.files).forEach((file)=> {
      //   images.push(event.currentTarget.files.files[file])
      // })
      // console.log(images)

      // const photos = [];
// 
      // for(let i = 0 ; i< images.length; i++) {
      //   // console.log(typeof images, "hi")
      //   data.append(`images[]`, JSON.stringify(images[i]));
      //   // photos.push(images[i])
      // }

      for(let i = 0 ; i< file.length; i++) {
        // console.log(typeof photos, "hi")
        data.append(`images[]`, file[i]);
        // photos.push(images[i])
      }
      // data.append("images[]", images)
      // data.append("photos", event.currentTarget.files.files[0])
      // const user = {user: {...data}}
      // const user = {

      //   user: {

      //   name: data.get('firstName') + " " + data.get('lastName'),
      //   email_address: data.get('email'),
      //   password: data.get('password'),
      //   password_confirmation: data.get('password_confirmation'),
      //   birthday: value,
      //   summary: data.get('summary'),
      //   images: file.selectedFile

      //   }

      // }

      // console.log(images)

      createUser(data)
        .then(res => {

          console.log(res);
          history.push('/')
        })
        .catch(err => console.log(err))

      // console.log({
      //   name: data.get('firstName') + data.get('lastName'),
      //   email_address: data.get('email'),
      //   password: data.get('password'),
      //   password_confirmation: data.get('password_confirmation'),
      //   birthday: value,
      //   summary: data.get('summary'),
      //   image: file

      // });
    };
  // });
  const onFileChange = event => {
    // Update the state
    setFile([...event]);
    // console.log(event)

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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Birthdate"
                    inputFormat="yyyy-MM-dd"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField required {...params} name='birthday'/>}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="summary"
                  name="summary"
                  required
                  label="Brief summary of yourself"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <DropzoneArea name="images" onChange={(files) => onFileChange(files)} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
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