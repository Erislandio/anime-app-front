import React from "react";
import Loader from "react-loader-spinner";
import jikanjs from "jikanjs";
import {
  IoIosArrowRoundBack,
  IoMdMore,
  IoMdThumbsUp,
  IoMdTrophy,
  IoMdImages,
  IoMdContacts,
  IoIosThumbsDown,
  IoIosThumbsUp
} from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { FaStar, FaDesktop, FaCrown, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactStoreIndicator from "react-score-indicator";
import "./details.css";
import Modal from "react-modal";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      anime: null,
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const id = window.location.href.split("/").pop();

    console.log(id);

    jikanjs.loadAnime(id).then(anime => {
      this.setState({
        loading: false,
        anime
      });
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { loading, anime } = this.state;
    console.log(this);

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        base: "#000"
      }
    };

    return (
      <div id="details">
        {loading ? (
          <div id="loading">
            <Loader type="TailSpin" color="#f953c6" height={50} width={50} />
          </div>
        ) : (
          <main className="main-details-top">
            <div className="top-info">
              <Link to="/search" className="">
                <IoIosArrowRoundBack size={35} color="#fff" />
              </Link>
              <h2>{anime.title}</h2>
              <MdFavoriteBorder size={30} color="#f953c6" opacity={0.7} />
              <IoMdMore
                size={30}
                color="#fff"
                opacity={1}
                onClick={this.openModal}
              />
            </div>

            <div className="iframe-trailer">
              <iframe
                src={anime.trailer_url}
                style={{
                  width: "100%",
                  minHeight: "200px",
                  margin: 0,
                  border: 0
                }}
              />
            </div>

            <div className="mosaic-info">
              <div className="episodes">
                Episódios <FaDesktop size={20} color="#9b59b6" />
                <span>{anime.episodes}</span>
              </div>
              <div className="rank">
                Rank <FaCrown size={20} color="#ffb229" />
                <span>{anime.rank}°</span>
              </div>
              <div className="popularity">
                Popularidade <IoMdTrophy size={20} color="#ffb229" />
                <span> {anime.popularity}° </span>
              </div>
              <div className="likes">
                Likes <IoMdThumbsUp size={20} color="#3498db" />
                <span> {anime.favorites} </span>
              </div>
              <div className="genre">
                Genero <IoMdImages size={20} color="#1abc9c" />
                <span> {anime.genres[0].name} </span>
              </div>
              <div className="genre">
                Membros <IoMdContacts size={20} color="#34495e" />
                <span> {anime.members} </span>
              </div>
            </div>

            <div className="avaliacao">
              <div>
                <h3>Score: {anime.score}</h3>
                <div>
                  <ReactStoreIndicator
                    value={anime.score}
                    maxValue={10}
                    width={100}
                  />
                </div>
                <div className="rating-content">
                  <button>
                    <IoIosThumbsUp color="#2ecc71" size={30} />
                  </button>
                  <button>
                    <IoIosThumbsDown color="#c0392b" size={30} opacity={0.6} />
                  </button>
                </div>
              </div>
            </div>

            <div className="description">
              <div>
                <h3>Descrição </h3>
                <div className="image-descrption">
                  <img src={anime.image_url} />
                  <p>{anime.synopsis}</p>
                </div>

                <h3 style={{ marginTop: "15px" }}>Produtoras</h3>
                <span className="produtoras">
                  {anime.producers.map(prod => {
                    return (
                      <a href={prod.url} key={prod.url}>
                        <span>
                          <h5>{prod.name}</h5>
                        </span>
                      </a>
                    );
                  })}
                </span>
              </div>
            </div>
          </main>
        )}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Opções"
        >
          <h3></h3>
        </Modal>
      </div>
    );
  }
}
