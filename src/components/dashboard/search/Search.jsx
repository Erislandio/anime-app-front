import React, { Component } from "react";
import { IoIosSearch, IoIosOptions } from "react-icons/io";
import "./search.css";
import { FilterContainer } from "./FilterContainer";
import client from "../../../client/client";
import { MdDoNotDisturb } from "react-icons/md";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      search: [],
      init: false,
      loadingData: false,
      text: ""
    };

    this.timeout = 0;
  }

  onClose = () => {
    this.setState({
      open: false
    });
  };

  handleChange = e => {
    const searchText = e.target.value;
    this.setState({ init: true, text: searchText });

    if (this.timeout) clearTimeout(this.timeout);

    setTimeout(() => {
      this.setState({ loadingData: true });
      client
        .jinkanApi({
          url: `/search/anime?q=${searchText}&limit=15`
        })
        .then(res => {
          this.setState(
            {
              search: res.data.results
            },
            () => {
              this.setState({ loadingData: false });
            }
          );
        });
    }, 500);

    if (searchText === "") {
      this.setState({ init: false, text: searchText });
    }
  };

  render() {
    const { open, search, loadingData, init, text } = this.state;

    console.log(this);

    return (
      <div id="search">
        <div className="">
          <div className="input-container">
            <span>
              <IoIosSearch size={25} color="#f953c6" id="icon-search" />
              <input
                ref="searchInput"
                type="text"
                placeholder="Animes, Mangas e Cinemas..."
                onChange={this.handleChange}
                autoFocus
              />
            </span>
            <div id="search-filter">
              <button className="btn-filter">
                <IoIosOptions
                  size={25}
                  color="#f953c6"
                  onClick={() => this.setState({ open: !open })}
                />
              </button>
            </div>
          </div>
          {!init && text == "" ? (
            <div className="search-content-text">
              <h2>Explorar </h2>
              <p>Busque por tudo que imaginar, novos conteudos é aqui</p>
            </div>
          ) : null}
          <FilterContainer open={open} onClose={this.onClose} />
          <main id={search && !loadingData ? "result-list" : "not-result-list"}>
            {search && !loadingData ? (
              search.map(anime => {
                return (
                  <div className="spot-search" key={anime.title}>
                    <Link
                      to={{ pathname: `details/${anime.mal_id}` }}
                      params={{ anime }}
                    >
                      <img
                        src={anime.image_url}
                        alt={anime.title}
                        width="170px"
                        height="200px"
                      />
                      <div className="card-info">
                        <h4>{anime.title}</h4>
                        <div className="card-details">
                          <h4>
                            {anime.episodes}{" "}
                            {anime.episodes > 1 ? "Episódios" : "Episódio"}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div id="loading">
                <Loader
                  type="TailSpin"
                  color="#f953c6"
                  height={50}
                  width={50}
                />
              </div>
            )}
          </main>
        </div>
        {init && search.length === 0 ? (
          <div id="not-results">
            <MdDoNotDisturb size={100} color="#f953c6" />
            <h4>Sem resultados para a pesquisa: {text}</h4>
          </div>
        ) : null}
      </div>
    );
  }
}
