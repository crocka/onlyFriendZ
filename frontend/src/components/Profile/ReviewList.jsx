import React from 'react';
import Review from './Review'

export default function ReviewList(props) {

  //user = {user_id, name, ...}
  //review = {reviewer_id, user_id, location_id, commentSentence}
  const { user_id, reviewArray, state } = props;

  function makeReview() {

    let result = [];

    state.users.forEach(user => {

      reviewArray.forEach((review) => {

        if (user.id === review.reviewer_id) {

          result.push(<Review reviewerName={user.name} comment={review.comment} />);

        }
      })

    });

    return result;
  }


  return (
    <React.Fragment>
      {/* {makeReview()} */}
      {state.user_reviews.map(review => {

        if(review.user_id === user_id) {

          return (<Review reviewrName={review.reviewer_id} comment={review.comment}/>);

        }
      })}
    </React.Fragment>
  )
}