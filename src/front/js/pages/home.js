import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import SearchPage from "../component/search.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-3">
      <SearchPage></SearchPage>
      <h1> </h1> <p></p>{" "}
      <div className="alert alert-info">
        <img src="https://user-images.githubusercontent.com/112573464/216276882-8d2a2299-fe88-404f-ab6d-cab3290e779a.png" />
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)... ok?"}{" "}
      </div>{" "}
    </div>
  );
};
