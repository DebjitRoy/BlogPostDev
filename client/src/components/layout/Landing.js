import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CaroselLanding from "./CarouselLanding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib,
  faMountain,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  const [carosalState, changeCarousalState] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "/api/posts?limit=3&select=title,gist,postType,photoHero"
        );
        changeCarousalState(res.data.data, () => console.log(carosalState));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Fragment>
      <section className="landing">
        <div className="light-overlay">
          <div className="landing-inner">
            <h1 className="display-3 pt-5">বাতায়ন</h1>
            <p className="lead col-md-6">
              জীবন বদলে যায় বাইরের দৃশ্যের মতো। স্মৃতির পাতায় ধরা আছে কত মুহুর্ত
              - তারা ভিড় করে আসে বাতায়ন খুললেই।
            </p>
          </div>
        </div>
      </section>

      <section id="home-icons" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 text-center">
              <Link className="menu-tile" to="/travel">
                {/* <i className="fas fa-route fa-3x mb-2"></i> */}
                <FontAwesomeIcon icon={faMountain} className="fa-3x mb-2" />
                <h3>ভ্রমণিকা</h3>
                <p>ভ্রমণ সংকলন। কাছে দূরে, দেশে বিদেশে, নানান অভিজ্ঞতা।</p>
              </Link>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <Link className="menu-tile" to="/books">
                {/* <i className="fas fa-book fa-3x mb-2"></i> */}
                <FontAwesomeIcon icon={faBook} className="fa-3x mb-2" />
                <h3>মনের আনন্দ</h3>
                <p>বই পড়া, গান শোনা, সিনেমা দেখা, আর আড্ডার সাথে ধর্মচর্চাও।</p>
              </Link>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <Link className="menu-tile" to="/miscl">
                {/* <i className="fas fa-pen-fancy fa-3x mb-2"></i> */}
                <FontAwesomeIcon icon={faPenNib} className="fa-3x mb-2" />
                <h3>টুকিটাকি</h3>
                <p>
                  সব রকম চিন্তা ভাবনা, ভালো লাগা, মন্দ লাগা; যা কিছু মনে আসে।
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CaroselLanding data={carosalState} />
    </Fragment>
  );
};

export default Landing;
