import React from 'react';

const ImageUpload = (props) => {
  return (
    <div className="file-field input-field">
      <div className="btn #64b5f6 blue lighten-2 darken-1">
        <span>{props.text}</span>
        <input type="file" onChange={(e) => props.onChange(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
}

export default ImageUpload;