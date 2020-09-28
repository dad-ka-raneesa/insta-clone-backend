import React from 'react';

const Button = (props) => {
  return (
    <button
      className="btn #64b5f6 blue lighten-2 darken-1"
      onClick={() => props.onClick()}>{props.text}</button>
  );
}

export default Button;