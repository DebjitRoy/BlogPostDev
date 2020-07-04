import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CaroselLanding from "./CarouselLanding";

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
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">চরৈবতি</h1>
            <p className="lead">ঘোরার গল্প, সিনেমার গল্প, আরো কিছু..</p>
          </div>
        </div>
      </section>

      <section id="home-icons" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 text-center">
              <Link className="menu-tile" to="/travel">
                <i className="fas fa-road fa-3x mb-2"></i>
                <h3>ভ্রমণিকা</h3>
                <p>
                  ভ্রমণ পিপাসু আমরা এখন কোন ছুটির তোয়াক্কা করিনা, বছরের যেকোন
                  সময়ে বেড়িয়ে পড়লেই হলো।
                </p>
              </Link>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <Link className="menu-tile" to="/books">
                <i className="fas fa-book fa-3x mb-2"></i>
                <h3>মনের আনন্দ</h3>
                <p>
                  যেকোন ধরনের বই পড়তেই ভালো লাগে। ধর্ম, ইতিহাস, প্রবন্ধ, সামাজিক
                  ,ছোট গল্প ,উপন‍্যাস।
                </p>
              </Link>
            </div>
            <div className="col-md-4 mb-4 text-center">
              <Link className="menu-tile" to="/miscl">
                <i className="fab fa-affiliatetheme fa-3x mb-2"></i>
                <h3>টুকিটাকি</h3>
                <p>
                  কত কিছু বলার আছে কত কিছু শোনার বাকি। কতকিছু দেখলাম এ জীবনে
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
