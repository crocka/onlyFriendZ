import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getUserFromUserId } from '../../helpers';

export default function Review(props) {

  const { review,state } = props;
  
  const reviewer = getUserFromUserId(state, review.reviewer_id);

  console.log(review)

  return (
    <Card sx={{ width: '100%', mt: 2, mb: 2 }} >
      <CardActionArea>
        <CardContent style={{ backgroundColor: "paper" }}>
          <Typography variant="body2" color="text.secondary">
            {reviewer.name}
            {review.comment}
            {review.updated_at.split('T')[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
