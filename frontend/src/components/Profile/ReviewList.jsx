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

  const { user_id, location_id, initialState } = props;

  const { createUserReview, createComment, getState } = useApplicationData();

  const [value, setValue] = React.useState(5);

  const [state, setState] = React.useState(initialState);

  const formRef = React.useRef();

  const [reviews, setReviews] = React.useState([])

  const commentRef = React.useRef('');

  React.useEffect(() => {

    getState()
      .then(state => {

        setState(state);
        setReviews(prev => user_id === undefined ? getReviewsFromLocationId(state, location_id) : getReviewsFromUserId(state, user_id));

      })

  }, [reviews]);

  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {

      comment: commentRef.current,

    };

    if (user_id !== undefined) {

      // data.append('user_id', user_id);
      // data.append('reviewer_id', Cookies.get('UserID'));

      data.user_id = user_id;
      data.reviewer_id = Cookies.get('UserID');
      // console.log(data)
      createUserReview(data)
        .then(res => {
          // console.log(res)
          setReviews(prev => {

            prev.push({...res});
            console.log(prev)
            return prev;


          });
          formRef.current.reset();

        })
        .catch(err => console.log(err));


    }

    if (location_id !== undefined) {

      // data.append('rating', value);
      // data.append('user_id', Cookies.get('UserID'));
      // data.append('location_id', location_id);

      data.rating = value;
      data.user_id = Cookies.get('UserID');
      data.location_id = location_id;

      // console.log(data)
      createComment(data)
        .then(res => {
          // console.log(res)

          setReviews(prev => {

            prev.push({ ...res });
            // console.log(prev)
            return prev;

          });
          formRef.current.reset();

        })
        .catch(err => console.log(err));

      
    }
    console.log(reviews)
  };

  return (
    <React.Fragment>

      <Box ref={formRef} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField fullWidth required autoFocus id="standard-basic" name='comment' label="Please leave your reviews or comments..." variant="standard" onChange={(event) => { commentRef.current = event.target.value }} />


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


      {reviews.slice().reverse().map(review => {

        // console.log(review)
        return (

          <Review key={review.id} review={review} state={state} />

        );

      })}


    </React.Fragment>
  )
}