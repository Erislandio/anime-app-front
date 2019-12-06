import React from "react";
import Loader from "react-loader-spinner";
import jikanjs from "jikanjs";
import { IoIosArrowRoundBack, IoMdShare } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import ReactStoreIndicator from "react-score-indicator";
import "./details.css";
import Modal from "react-modal";
import { AnimeSpecifications } from "./AnimeSpecifications";
import { ShareContent } from "./ShareContent";
import { Link } from "react-router-dom";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      anime: null,
      modalIsOpen: false,
      openModalImage: false
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const isId = id ? id : window.location.href.split("/").pop();

    jikanjs.loadAnime(isId).then(anime => {
      this.setState({
        loading: false,
        anime
      });
    });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, openModalImage: false });
  };

  openModalImage = () => {
    this.setState({ openModalImage: true });
  };

  render() {
    const { loading, anime, openModalImage, modalIsOpen } = this.state;
    const { close, id } = this.props;
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
              {id ? (
                <span>
                  <IoIosArrowRoundBack size={35} color="#fff" onClick={close} />
                </span>
              ) : (
                <Link to={{ pathname: "/home" }}>
                  <IoIosArrowRoundBack size={35} color="#fff" onClick={close} />
                </Link>
              )}
              <h2>{anime.title}</h2>
              <MdFavoriteBorder size={30} color="#f953c6" opacity={0.7} />
              <IoMdShare
                size={25}
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
                title={anime.title}
              />
            </div>

            <AnimeSpecifications anime={anime} />

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
              </div>
            </div>

            <div className="description">
              <div>
                <h3>Descrição </h3>
                <div className="image-descrption">
                  <img
                    src={anime.image_url}
                    alt={anime.title}
                    onClick={() => this.openModalImage()}
                  />
                  <p>{anime.synopsis}</p>
                </div>

                {anime.producers.length ? (
                  <>
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
                  </>
                ) : null}
              </div>
            </div>
            <div id="btn-view">
              <div>
                <button>Já vi</button>
                <button>Quero ver</button>
              </div>
            </div>
          </main>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Opções"
        >
          <ShareContent anime={anime} />
        </Modal>
        <Modal
          id="modal-image"
          isOpen={openModalImage}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Opções"
        >
          {anime && <img src={anime.image_url} alt={anime.title} />}
        </Modal>
      </div>
    );
  }
}
