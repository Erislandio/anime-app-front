import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./home.css";

export const Home = props => {
  const { user } = props;

  if (!user) {
    return (
      <div id="loading">
        <Loader type="TailSpin" color="#f953c6" height={50} width={50} />
      </div>
    );
  }

  return (
    <div id="home">
      <div className="wellcome">
        <h1>
          Seja muito bem vindo <b>{user.name}</b>
        </h1>
        <p>Estamos felizes em te ver!</p>
      </div>
    </div>
  );
};
