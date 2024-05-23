import React from 'react';
import PropTypes from 'prop-types';

interface AvatarCustomProps {
    imageUrl: string;
}

const AvatarCustom = ( props:AvatarCustomProps) => {
  return (
    <div
      style={{
        minWidth: '50px',
        minHeight: '50px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'white',
        border: '2px solid white',
      }}
    >
    
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: "#00C299",
          left: '-5px',
          top: '30%',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      ></div>

    <img
        src={props.imageUrl}
        alt="avatar"
        style={{
            position: 'absolute',
            width: '100%',
            height: 'auto',
            top: '0',
            left: '54%',
            transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      />
    </div>
  );
};

AvatarCustom.propTypes = {
    imageUrl: PropTypes.string.isRequired,
  };

export default AvatarCustom;
