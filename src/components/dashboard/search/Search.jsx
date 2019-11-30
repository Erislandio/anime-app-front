import React, { Component } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import "./search.css";
import { FilterContainer } from "./FilterContainer";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  onClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { open } = this.state;

    return (
      <div id="search">
        <div className="input-container">
          <span>
            <IoIosSearch size={25} color="#f953c6" id="icon-search" />
            <input type="text" placeholder="Animes, Mangas e Cinemas..." />
          </span>
          <div id="search-filter">
            <button className="btn-filter">
              <MdFilterList
                size={25}
                color="#f953c6"
                onClick={() => this.setState({ open: !open })}
              />
            </button>
          </div>
          <FilterContainer open={open} onClose={this.onClose} />
        </div>
      </div>
    );
  }
}
