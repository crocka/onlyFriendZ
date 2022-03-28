import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getUserFromUserId } from '../../helpers';
import Rating from '@mui/material/Rating';

export default function Review(props) {

  const { review, state } = props;

  let reviewer = getUserFromUserId(state, review.reviewer_id);

  if (reviewer === undefined) {
    
    reviewer = getUserFromUserId(state, review.user_id);
    

  }

  return (
    <Card sx={{ width: '100%', mt: 2, mb: 2 }} >
      <CardActionArea>
        <CardContent style={{ backgroundColor: "light gray" }}>
          <Typography variant="h6" color="text.secondary" >
            {reviewer.name}
          </Typography>
          <Typography variant="body1">
            {review.comment}
          </Typography>
          {review.rating ?

            <Rating
              name="simple-controlled"
              value={review.rating}
              readOnly

            /> : ''}

          <Typography variant="body2" align="right">
            {review.updated_at.split('T')[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
