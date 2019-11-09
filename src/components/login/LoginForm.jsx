import React, { Component } from "react";
import { Logo } from "../../assets/svg/icons";
import { IoIosArrowRoundBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { Loading } from "../loading/loading";
import client from "../../client/client";
import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
      error: null
    };
  }

  handleChageInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitForm = e => {
    const { history } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    this.setState({ loading: true });

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
          data: { token },
          status
        } = res;

        if (status === 200) {
          Cookie.set("id", token);

          history.push("/dashboard");
          this.setState({
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          error,
          loading: false
        });
      });
  };

  render() {
    const { email, password, loading, error } = this.state;

    return (
      <div id="login-form" className="login-page form-login">
        <Link to="/initial" className="back-btn">
          <IoIosArrowRoundBack size={50} color="#fff" />
        </Link>
        <div>
          <Logo />
          <h2>Entrar</h2>
          <h4>E se divertir</h4>
        </div>
        <div className="form-content">
          <form id="login-form-content" onSubmit={this.handleSubmitForm}>
            <div>
              <span className="label-input">
                <input
                  value={email}
                  placeholder="Email"
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
            </div>
            <div className="login-btn-content">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    Entrar
                    <IoIosArrowForward />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
