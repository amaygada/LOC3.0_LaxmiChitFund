import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({height, width}) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: width,
        height: height,
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
