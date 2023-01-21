import React from "react";

function Footer() {
  const item = [
    {
      id: 1,
      audio: "https://www.youtube.com/watch?v=T8D8vEcZrqM",
      formato: "audio/mpeg",
    },
  ];
  return (
    <div>
      <div key={item.id}>
        <audio>
          <source src={item.audio} type={item.formato} />{" "}
        </audio>{" "}
      </div>{" "}
      <footer
        className="footer  bg-dark container-fluid d-flex justify-content-center align-items-center"
        /* style="height: 150px" */
        style={{
          height: "150px",
        }}
      >
        <p className="text-white fw-bold">
          Copyright© JoseLu, Lola y Quique March 2023{" "}
        </p>{" "}
      </footer>{" "}
    </div>
  );
}
export default Footer;
