import React from 'react'

const ButtonUser = ({ text, selected, handleClick }) => {
  return (
    <div className="d-flex justify-content-center">
    <button
      className={`nav-link ${selected ? "active" : ""}`}
      aria-current="page"
      onClick={handleClick}
      style={{
        // width: "80%",
        marginTop: "2vw",
        backgroundColor: selected ? "#FEBD2F" : "",
        color: "black",
      }}
    >
      {text}
    </button>
  </div>
  )
}

export default ButtonUser