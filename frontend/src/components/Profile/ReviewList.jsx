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

  const [error, setError] = React.useState(false);

  const commentRef = React.useRef('');

  function resetError() {
    setError(false);
  }

  function handleError() {
    setError(true);
  }

  React.useEffect(() => {

    getState()
      .then(state => {

        setState(state);
        setReviews(prev => {

          return user_id === undefined ? getReviewsFromLocationId(state, location_id) : getReviewsFromUserId(state, user_id);

        });

      })

  }, []);

  // React.useEffect(() => {

  //   console.log('rendering2')
  //   getState()
  //     .then(state => {

  //       setState(state);
  //       // setReviews(prev => user_id === undefined ? getReviewsFromLocationId(state, location_id) : getReviewsFromUserId(state, user_id));

  //     })

  // }, [reviews]);

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
      if (commentRef.current.trim() !== "") {
      createUserReview(data)
        .then(res => {
          // console.log(res)
          setReviews(prev => {

            prev.push({ ...res });
            console.log(prev)
            return prev;

          });

          // setState(prev => prev);
          formRef.current.reset();

        })
        .then(() => {

          getState()
            .then(state => {

              setState(state);
              setReviews(prev => {

                return user_id === undefined ? getReviewsFromLocationId(state, location_id) : getReviewsFromUserId(state, user_id);

              });

            })
        })
        .catch(err => console.log(err));
      } else {
        handleError();
      }
    }

    if (location_id !== undefined) {

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
        .then(() => {

          getState()
            .then(state => {

              setState(state);
              setReviews(prev => {

                return user_id === undefined ? getReviewsFromLocationId(state, location_id) : getReviewsFromUserId(state, user_id);

              });

            })
        })
        .catch(err => console.log(err));


    }

  };

  return (
    <React.Fragment>

      {error && <tag style={{color:"red"}}>Please enter a comment for your review!</tag>}
      <Box ref={formRef} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {user_id === Cookies.get('UserID') ? '' : <TextField fullWidth required autoFocus id="standard-basic" name='comment' label="Please leave your reviews or comments..." variant="standard" onChange={(event) => { commentRef.current = event.target.value }} error={error} onClick={resetError} />}


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

        {user_id === Cookies.get('UserID') ? '' : <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>}

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