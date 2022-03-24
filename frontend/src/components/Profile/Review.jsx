import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

export default function Review (props) {

  const {reviewerName, comment} = props;

  return (
    <div style={{ height: 250, width: '100%' }}>
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