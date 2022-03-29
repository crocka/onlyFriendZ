import React from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from 'material-ui-dropzone';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import useApplicationData from '../../hooks/useApplicationData.jsx';

export default function PictureWall(props) {

  const { images, location_id, user_id } = props;

  const { updateLocationImage, updateUserImage, deleteUserImage, getState, getUser, getLocation } = useApplicationData();

  const [image, setImage] = React.useState(images);

  const [file, setFile] = React.useState({});

  const [hidden, setHidden] = React.useState(true);

  const handleSubmit = (event) => {

    event.preventDefault();
    event.currentTarget.reset();

    const data = new FormData();

    for (let i = 0; i < file.length; i++) {

      data.append(`images[]`, file[i]);

    }

    if (user_id == Cookies.get('UserID')) {

      updateUserImage(user_id, data)
        .then(() => {

          alert("You look amazing!");
          setHidden(true);
          setFile({});

        })
        .then(() => {

          getUser(user_id)
            .then(user => {

              setImage(user.data.images);
              console.log(user)
            })
        })
        .catch(err => alert("Something went wrong. Please try again later."));


    } else {

      updateLocationImage(location_id, data)
        .then(() => {

          alert("Thank you for your contributions");
          setHidden(true);
          setFile({});

        })
        .then(() => {

          getLocation(location_id)
            .then(location => {

              setImage(location.data.images);
              console.log(location)

            })
        })
        .catch(err => alert("Something went wrong. Please try again later."));

    }

  }

  const handleDelete = function (user_id) {

    const data = new FormData();

    for (let i = 0; i < file.length; i++) {

      data.append(`images[]`, file[i]);

    }

    deleteUserImage(user_id, data)
      .then(() => {

        alert("Images deleted!");
        setHidden(true);
        setFile({});

      })
      .then(() => {

        getUser(user_id)
          .then(user => {

            setImage(user.data.images);
            console.log(user)
          })
      })
      .catch(err => alert("Something went wrong. Please try again later."));

  }

  const onFileChange = event => {

    // Update the state
    setFile([...event]);

  };

  return (

    <React.Fragment>
      {location_id !== undefined || user_id == Cookies.get('UserID') ?

        <React.Fragment>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setHidden(prev => !prev)}
            >
              {hidden ? (location_id !== undefined ? 'Add photos' : 'Edit photos') : 'Close'}

            </Button>

            <Grid item hidden={hidden}>
              <DropzoneArea clearOnUnmount name="images" filesLimit={20} onChange={(files) => onFileChange(files)} />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>

              {user_id == Cookies.get('UserID') ?

                <Button
                  onClick={() => handleDelete(user_id)}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Delete photos
                </Button> : ''}

            </Grid>
          </Box>

        </React.Fragment>

        : ''}

      <Grid item xs={12} md={4} lg={3}>
        {/* <Paper> */}
        <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {image.map((item) => (
              <ImageListItem key={item}>
                <img
                  src={item}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={images.title && images.title}
                  loading="lazy"
                />
                <ImageListItemBar position="below" title={item.author} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        {/* </Paper> */}
      </Grid>
    </React.Fragment>
  );
}