import React from 'react';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Success = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ color: 'green', fontSize: '100px' }} />
      <h2 className='text-green-600 text-lg'>Payment Successful!</h2>
      <p className='text-green-800 text-md mt-4'>Your payment has been processed successfully.</p>
      <Button variant="contained" color="primary" style={{marginTop:"20px"}} href="/">
        Back to Home
      </Button>
    </div>
  );
};

export default Success;