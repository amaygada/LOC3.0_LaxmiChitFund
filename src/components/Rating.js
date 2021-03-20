import React from 'react';

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating mt-3">
      <span>
        <i
          style={{ color:'orange', fontSize: '1.1rem' }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          style={{ color:'orange', fontSize: '1.1rem' }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          style={{ color:'orange', fontSize: '1.1rem' }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          style={{ color:'orange', fontSize: '1.1rem' }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          style={{ color, fontSize: '1.1rem' }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span style={{ fontSize: '1.1rem', fontWeight: '1000' }}>
        {text && text}
      </span>
    </div>
  );
};

Rating.defaultProps = {
  color: 'orange',
};

export default Rating;
