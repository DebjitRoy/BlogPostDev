import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => (
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
                ভ্রমণ পিপাসু আমরা এখন কোন ছুটির তোয়াক্কা করিনা, বছরের যেকোন সময়ে
                বেড়িয়ে পড়লেই হলো।
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
              <i className="fas fa-pencil-alt fa-3x mb-2"></i>
              <h3>টুকিটাকি</h3>
              <p>কত কিছু বলার আছে কত কিছু শোনার বাকি। কতকিছু দেখলাম এ জীবনে</p>
            </Link>
          </div>
        </div>
      </div>
    </section>

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
          <div className="carousel-item carousel-image-1 active">
            <div className="container">
              <div className="carousel-caption d-sm-block text-right mb-5">
                <h2 className="display-3">আমেরিকা ভ্রমণ</h2>
                <p className="lead">
                  কাটিয়ে এলাম আমেরিকায় কদিন....
                  <br />
                  মনে আছে, ছোট বেলায় বেড়াতে যেতাম কতো হাঙ্গামা করে,বিস্তর লটবহর
                  নিয়ে। এখন ছিমছাম ভ্রমণ। একটি স্মার্টফোন ও টাকা থাকলেই হলো,
                  সবকিছু হাতের মুঠোয়। ভারতের নানা জায়গায় ঘুরেছি সেই বৃত্তান্ত
                  এখন এখানে লিখে রাখবো।
                </p>
                <a className="btn btn-danger btn-lg">পড়ুন</a>
              </div>
            </div>
          </div>

          <div className="carousel-item carousel-image-2">
            <div className="container">
              <div className="carousel-caption d-sm-block mb-5">
                <h3 className="display-3">চিলাপাতায় চার দিন</h3>
                <p className="lead">এবার আমাদের গন্তব্য ডুয়ার্স।</p>
                <a className="btn btn-danger btn-lg">পড়ুন</a>
              </div>
            </div>
          </div>

          <div className="carousel-item carousel-image-3">
            <div className="container">
              <div className="carousel-caption d-sm-block text-right mb-5">
                <h3 className="display-3">ধৰ্ম ও অনুভূতি</h3>
                <p className="lead">
                  দুই ঠাকুর তো মন জুড়ে বসে আছেন রবি আর রাম(কৃষ্ণ)। পুরোনো বইয়ের
                  গন্ধ ও স্মৃতি ঘুরে বেড়ায় মনে। তাও ভাগ করে নিতে চাই সবার সাথে।
                </p>
                <a className="btn btn-danger btn-lg">পড়ুন</a>
              </div>
            </div>
          </div>
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
  </Fragment>
);

export default Landing;
