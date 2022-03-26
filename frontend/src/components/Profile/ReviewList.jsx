import React from 'react';
import Review from './Review'
import { getReviewsFromUserId, getReviewsFromLocationId } from '../../helpers.jsx';
import useApplicationData from '../..//hooks/useApplicationData.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

export default function ReviewList(props) {

  const { user_id, location_id } = props;

  const { createUserReview, createComment, state } = useApplicationData();

  const [value, setValue] = React.useState(5);

  const commentRef = React.useRef('');

  const reviews = user_id === undefined ? getReviewsFromLocationId(state, location_id) : getReviewsFromUserId(state, user_id);

  console.log(state)

  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {

      comment: commentRef.current,

    };

    if (user_id !== undefined) {

      // data.append('user_id', user_id);
      // data.append('reviewer_id', Cookies.get('UserID'));

      data.user_id = user_id;
      data.reviewer_id =  Cookies.get('UserID');
// console.log(data)
      createUserReview(data)
        .catch(err => console.log(err));
    }

    if (location_id !== undefined) {

      // data.append('rating', value);
      // data.append('user_id', Cookies.get('UserID'));
      // data.append('location_id', location_id);

      data.rating = value;
      data.user_id = Cookies.get('UserID');
      data.location_id = location_id;

      createComment(data)
        .catch(err => console.log(err));
    }
  };

  return (
    <React.Fragment>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField fullWidth required autoFocus id="standard-basic" name='comment' label="Please leave your reviews or comments..." variant="standard" onChange={(event) => {commentRef.current = event.target.value}} />


        {location_id !== undefined ?
          <React.Fragment>
            <Typography component="legend">How would you rate this place?</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </React.Fragment>
          : ''}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>

      </Box>

      {reviews ? reviews.map(review => {

        return (<Review review_id={review.id} reviewrName={review.reviewer_id} comment={review.comment} />);

      }) : ""}

    </React.Fragment>
  )
}