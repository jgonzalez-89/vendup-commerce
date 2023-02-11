import React from "react";

const Button = (props) => {
  return (
    <button type="button" className="btn btn-outline-light me-2">
      {props.text}
    </button>
  );
};

export default Button;
