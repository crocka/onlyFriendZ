import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

export default function Review (props) {

  const { review_id, reviewerName, comment} = props;

  console.log(review_id)
  return (
    <div key={review_id} style={{ width: '100%' }}>
      {/* <DataGrid
        columns={[{ field: 'username' }, { field: 'review' }]}
        rows={[
          {
           username: reviewerName,
           review: comment
          }
        ]}
      /> */}

      <p>{reviewerName}</p>
      <p>{comment}</p>
    </div>
  )
}

//{ }