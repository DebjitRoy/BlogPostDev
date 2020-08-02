import React from "react";
import { Link } from "react-router-dom";

const CaroselLanding = (props) => {
  return (
    <section id="showcase">
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-target="#myCarousel"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          {props.data &&
            props.data.map((card, idx) => {
              //   let carClass = "carousel-item carousel-image-1";
              let divImg = {
                backgroundImage:
                  card.photoHero !== "no-photo.jpg"
                    ? `url(https://bengali-blog-static-uploads.s3.amazonaws.com/${card.photoHero})`
                    : `url(/uploads/carousel-${idx + 1}.jpg)`,
                backgroundPosition: "center",
              };
              let carClass =
                idx === 0
                  ? "carousel-item carousel-image active"
                  : "carousel-item carousel-image";
              return (
                <div className={carClass} style={divImg} key={card._id}>
                  <div className="container">
                    <div className="carousel-caption d-sm-block text-right mb-5">
                      <h4 className="display-4">{card.title}</h4>
                      {/* <p className="lead">{card.gist}</p> */}
                      <Link
                        to={`/${card.postType}/${card._id}`}
                        className="btn btn-danger btn-lg"
                      >
                        পড়ুন
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <a
          href="#myCarousel"
          data-slide="prev"
          className="carousel-control-prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </a>

        <a
          href="#myCarousel"
          data-slide="next"
          className="carousel-control-next"
        >
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
    </section>
  );
};

export default CaroselLanding;
