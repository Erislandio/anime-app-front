import React from "react";
import Loader from "react-loader-spinner";
import client from "../../client/client";
import axios from "axios";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      anime: null
    };
  }

  componentDidMount() {
    const id = window.location.href.split("/").pop();
    axios({
      url: `https://api.jikan.moe/v3/anime/${id}/characters_staff/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res);
      this.setState({ loading: false, anime: res.data });
    });
  }

  render() {
    const { loading, anime } = this.state;
    console.log(this);
    return (
      <div id="details">
        {loading ? (
          <div id="loading">
            <Loader type="TailSpin" color="#f953c6" height={50} width={50} />
          </div>
        ) : (
          "Carregado"
        )}
      </div>
    );
  }
}
