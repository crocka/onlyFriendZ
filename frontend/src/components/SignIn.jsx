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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useApplicationData from '../hooks/useApplicationData';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';




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

export default function SignIn(props) {
  const [scroll, setScroll] = React.useState('paper');
  const [open, setOpen] = React.useState(true);
  const [error, setError] = React.useState(false);
  const history = useHistory()
  const { logInUser } = useApplicationData();

  function handleClose() {
    setOpen(false);
  };

  function resetError() {
    setError(false);
  }

  function handleError() {
    setError(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    logInUser({

      email_address: data.get('email'),
      password: data.get('password')

    })
      .then(res => {
        Cookies.set('UserID', res.user_id)
        document.location.href="/";

        // const sub = props.cableApp.cable.subscriptions.create({channel: 'MarkersChannel', user_id: res.user_id});
      })
      .catch(err => {
        console.log(err);
        handleError();
      })

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={error}
                  onClick={resetError}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={error}
                  onClick={resetError}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {error && <tag style={{color:"red"}}>Incorrect email or password</tag>}
                <br/>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" onClick={() => history.push('/signup')} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
            </DialogContent>
            </Dialog>
  );
}