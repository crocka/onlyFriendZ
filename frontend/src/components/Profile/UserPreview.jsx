import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import useApplicationData from '../../hooks/useApplicationData.jsx';
import PictureWall from './PictureWall';
import { useParams } from "react-router-dom";
import Summary from '../Summary';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


export default function UserProfile(props) {

  let { id } = useParams();

  if (id === undefined) {

    id = props.id;

  }

  const [user, setUser] = React.useState({});

  const { getUser } = useApplicationData();

  React.useEffect(() => {

    getUser(id).then(response => {

      setUser(response.data);

    }).catch(err => console.error);

  }, []);

  return user ? (
    <React.Fragment>
      <Box sx={{height: 'max-content', width:'max-content'}}>
      <Grid item xs={12} md={12}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {normalizeObject(user).title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {normalizeObject(user).birthday}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={normalizeObject(user).images[0]}
              alt=""
            />
          </Card>
        </CardActionArea>
      </Grid>
      </Box>
    </React.Fragment>
  ) : null;

}