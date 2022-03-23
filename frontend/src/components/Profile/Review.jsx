import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Review () {
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        columns={[{ field: 'username' }, { field: 'age' }, { field: 'review' }]}
        rows={[
          {
            id: 1,
            username: 'test',
            age: 30,
            review: 'test review'
          }
        ]}
      />
    </div>
  )
}

//{ }