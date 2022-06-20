import React from 'react';

function Avatar() {
  const styles = {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
  };

  return (
    <img
      style={styles}
      src="https://res.cloudinary.com/joelmturner/b_rgb:e7e5e5,q_auto/monster-01.png"
      alt="Monster P. Whittington portrait"
      title="Monster P. Whittington"
    />
  );
}

export default Avatar;
