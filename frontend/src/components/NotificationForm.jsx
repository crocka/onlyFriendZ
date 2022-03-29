import { Marker, Popup, Circle } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import LocationProfile from './Profile/LocationProfile';
import { getUserFromUserId } from '../helpers';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import SignIn from './SignIn'
import { useHistory } from "react-router-dom"
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function NotificationForm(props) {

  const {messages, setMessages} = props;

  const [error, setError] = React.useState(false);

  const cookie = Cookies.get('UserID');

  const formRef = useRef();

  const messageRef = useRef('');

  // let sub = props.cableApp.cable.subscriptions.create({ channel: 'NotificationsChannel', user_id: cookie, message: "I am here." });

  const [sub, setSub] = useState(null);

  useEffect(() => {

    setSub(props.cableApp.cable.subscriptions.create({ channel: 'NotificationsChannel', user_id: cookie, message: "I am here." },

      {
        received: (data) => {

          updateMessages(data);
          
        }

      }));

    return () => {
     
      sub.unsubscribe();
    }

  }, []);

  function handleSubmit(event) {

    event.preventDefault();

    if (messageRef.current.trim() === '') {

      setError(true);

    } else {

      sub.send({ channel: 'NotificationsChannel', user_id: cookie, message: `${messageRef.current}` });

      formRef.current.reset();

      messageRef.current = '';

      setError(false);

    }


  }

  function updateMessages(data) {

    const arr = messages;

    arr.push(data);

    setMessages([...arr]);

  };


  return (

    <React.Fragment>

      <Box ref={formRef} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField fullWidth required autoFocus id="standard-basic" name='message' label="Shout out to other users..." onChange={(event) => { messageRef.current = event.target.value }} variant="standard" error={error} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
      </Box>

      {messages.slice().reverse().map(message => {

        const sender = getUserFromUserId(props.state, Object.keys(message)[0]);

        return (
        
        <Card key={`${sender.id}_${message[Object.keys(message)[0]]}`} sx={{ width: '100%', mt: 2, mb: 2 }} >
          <CardActionArea>
            <CardContent style={{ backgroundColor: "light gray" }}>
              <Typography variant="h6" color="text.secondary" >
                {sender && sender.name}
              </Typography>
              <Typography variant="body1">
                {message[Object.keys(message)[0]]}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        );

      })}


    </React.Fragment >

  );

};
