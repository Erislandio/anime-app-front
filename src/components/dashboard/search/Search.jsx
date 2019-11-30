import React, { Component } from "react";
import { IoIosSearch, IoIosOptions } from "react-icons/io";
import "./search.css";
import { FilterContainer } from "./FilterContainer";
import client from "../../../client/client";
import { AiOutlineLike } from "react-icons/ai";
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
      client
        .jinkanApi({
          url: `/search/anime?q=${searchText}&limit=15`
        })
        .then(res => {
          this.setState({
            search: res.data.results
          });
        });
    }, 1000);

    if (searchText === "") {
      this.setState({ init: false, text: searchText });
    }
  };

  render() {
    const { open, search, loadingData, init, text } = this.state;

    console.log(search);

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
          <main id="result-list">
            {search &&
              search.map(anime => {
                return (
                  <div className="spot-search" key={anime.title}>
                    <img
                      src={anime.image_url}
                      alt={anime.title}
                      width="150px"
                      height="200px"
                    />
                    <div className="card-info">
                      <h4>{anime.title}</h4>
                      <div className="card-actions">
                        <button>info</button>
                        <button>
                          <AiOutlineLike color="#fff" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            {init && search.length === 0 ? <h2>Sem resultados...</h2> : null}
          </main>
        </div>
      </div>
    );
  }
}
