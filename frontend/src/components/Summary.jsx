import * as React from 'react';
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
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function Summary(props) {

  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  const { obj } = props;

  function handleClose() {
    setOpen(false);
    history.push('/');
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
          <div className="profile-pic">
            <Avatar
              alt="Remy Sharp"
              src={obj.images[0]}
              sx={{ width:400, height: 400}}
            />
            {/* <img src={obj.images[0]} alt="" width={250} height={250} /> */}
          </div>
          <Typography className="info" component="h1" variant="h5">{obj.title}</Typography>
          <div className="biography">{obj.summary}</div>
          {obj.birthday === '' ? '' : <div className='birthday'>{obj.birthday}</div>}
          <div className="interact-buttons">
            <IconButton className="back" onClick={handleClose} sx={{ m: 1, color: 'red', border: "solid 2px" }}>
              <KeyboardBackspaceOutlinedIcon />
            </IconButton>
            <IconButton className="message" sx={{ m: 1, color: 'blue', border: "solid 2px" }}>
              <MessageIcon />
            </IconButton>
          </div>
        </Box>
      </Container>
    </ThemeProvider>


  );
}