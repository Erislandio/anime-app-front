import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./home.css";
import client from "../../../client/client";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: []
    };
  }

  componentDidMount() {
    client
      .jinkanApi({
        url: "/anime/20/recommendations"
      })
      .then(({ data }) => {
        this.setState({
          recommendations: data.recommendations
        });
      })
      .catch(error => {
        return;
      });
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return (
        <div id="loading">
          <Loader type="TailSpin" color="#f953c6" height={50} width={50} />
        </div>
      );
    }

    const { recommendations } = this.state;

    const settings = {
      dots: false,
      infinite: false,
      speed: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 50
    };

    return (
      <div id="home">
        <div className="wellcome">
          <h1>
            Seja muito bem vindo <br />
            <b>{user.name}</b>
          </h1>
          <p>Estamos felizes em te ver!</p>
        </div>
        <div className="content-home">
          <main id="recomentations" className="main">
            <div>
              <h3>Recomendados para vc!</h3>
              <Slider {...settings}>
                {recommendations.length &&
                  recommendations.map((rec, index) => {
                    return (
                      <div key={index} className="spot-anime">
                        <Link to={{ pathname: `details/${rec.mal_id}` }}>
                          <img
                            src={rec.image_url}
                            width="200px"
                            height="250px"
                            alt={rec.title}
                          />
                        </Link>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
