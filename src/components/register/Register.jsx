import React, { Component } from "react";
import { Logo } from "../../assets/svg/icons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Loading } from "../loading/loading";
import client from "../../client/client";
import { withRouter } from "react-router-dom";
import InputMask from "react-input-mask";
import Cookie from "js-cookie";
import { compose } from "redux";
import { checkMail } from "../../utils/emailVaidator";

import "./register.css";

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
      error: null,
      birth: "",
      genre: "Não especificado",
      name: "",
      zipcode: "",
      tel: "",
      confirmPass: "",
      theposition: window.pageYOffset
    };

    this.genres = ["Não especificado", "Masculino", "Feminino"];
  }

  handleChageInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitForm = e => {
    const { history } = this.props;
    const {
      email,
      password,
      confirmPass,
      zipcode,
      tel,
      birth,
      name
    } = this.state;
    e.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPass ||
      !name ||
      !birth ||
      !tel ||
      !zipcode
    ) {
      ToastsStore.error("Faltam campos a serem preenchidos");
      return;
    }

    if (!checkMail(email)) {
      ToastsStore.error("Email Inválido");
      return;
    }

    if (password != confirmPass) {
      ToastsStore.error("As senhas estão diferentes");
      return;
    }

    this.setState({ loading: true });

    client({
      method: "POST",
      url: "/register",
      data: {
        ...this.state
      }
    })
      .then(({ data }) => {
        if (data.error) {
          ToastsStore.error(data.error);
          return;
        }

        if (data._id) {
          client({
            method: "POST",
            url: "/login",
            data: {
              email,
              password
            }
          })
            .then(res => {
              const {
                data: { token, user },
                data,
                status
              } = res;

              if (token) {
                Cookie.set("id", token);
                Cookie.set("user", user);
                history.push("/home");
              } else if (data.error) {
                ToastsStore.error(data.error);
              }

              this.setState({
                loading: false
              });
            })
            .catch(error => {
              ToastsStore.error("Ops! ocorreu algum erro, tente novamente.");
              this.setState({
                error,
                loading: false
              });
            });
        }

        this.setState({
          loading: false
        });
      })
      .catch(error => {
        ToastsStore.error("Ops! ocorreu algum erro, tente novamente.");
        this.setState({
          error,
          loading: false
        });
      });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    this.setState({
      theposition: scrolled
    });
  };

  render() {
    const {
      email,
      password,
      loading,
      error,
      name,
      tel,
      birth,
      zipcode,
      genre,
      confirmPass,
      theposition
    } = this.state;

    const disabledButton =
      !email || !password || !confirmPass || !name || !birth || !tel || !zipcode
        ? true
        : false;

    return (
      <div id="login-form" className="login-page form-login register-form">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <Link to="/initial" className="back-btn">
          <IoIosArrowRoundBack size={50} color="#fff" />
        </Link>
        <div>
          <Logo />
          <h2>Criar conta</h2>
        </div>
        <div className="form-content">
          <form id="login-form-content" onSubmit={this.handleSubmitForm}>
            <div>
              <h3>Dados Pessoais</h3>
              <span className="label-input">
                <input
                  value={name}
                  placeholder="Nome"
                  name="name"
                  type="text"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
              <span className="label-input">
                <InputMask
                  mask="99/99/9999"
                  value={birth}
                  placeholder="Data de Nascimento"
                  name="birth"
                  type="tel"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
              <h3>Gênero</h3>
              <span className="select-content">
                <select
                  className="select-options"
                  onChange={this.handleChageInput}
                  name="genre"
                >
                  {this.genres.map((genre, index) => {
                    return (
                      <option key={index} name="genre">
                        {genre}
                      </option>
                    );
                  })}
                </select>
              </span>
              <span className="label-input">
                <InputMask
                  mask="99999-999"
                  value={zipcode}
                  placeholder="Cep"
                  name="zipcode"
                  type="tel"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
              <InputMask
                value={tel}
                placeholder="Telefone"
                name="tel"
                mask="(99) 99999-9999"
                type="text"
                autoComplete="false"
                onChange={this.handleChageInput}
              />
              <h3 style={{ marginTop: "30px" }}>Dados de Acesso</h3>
              <span className="label-input">
                <input
                  value={email}
                  placeholder="E-mail"
                  name="email"
                  type="text"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
              <span className="label-input">
                <input
                  value={password}
                  placeholder="Password"
                  name="password"
                  type="password"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
              <span className="label-input">
                <input
                  value={confirmPass}
                  placeholder="Confimar Password"
                  name="confirmPass"
                  type="password"
                  autoComplete="false"
                  onChange={this.handleChageInput}
                />
              </span>
            </div>
            <div
              className="login-btn-content"
              disabledbutton={disabledButton.toString()}
              showbutton={theposition == 1 ? "show" : "not-show"}
            >
              <button
                type="submit"
                className="login-btn"
                disabled={loading || disabledButton}
              >
                {loading ? <Loading /> : "Criar conta "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const encharge = compose(withRouter)(Register);

export default encharge;
