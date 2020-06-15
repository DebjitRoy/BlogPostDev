import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const TravelLanding = () => (
  <Fragment>
    <header id="page-header">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto text-center">
            <h1>ভ্রমণিকা</h1>
          </div>
        </div>
      </div>
    </header>

    <section id="about" className="py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <p>
              ভ্রমণ পিপাসু আমরা এখন কোন ছুটির তোয়াক্কা করিনা, বছরের যেকোন সময়ে
              বেড়িয়ে পড়লেই হলো। মনে আছে, ছোট বেলায় বেড়াতে যেতাম কতো হাঙ্গামা
              করে,বিস্তর লটবহর নিয়ে। এখন ছিমছাম ভ্রমণ। একটি স্মার্টফোন ও টাকা
              থাকলেই হলো, সবকিছু হাতের মুঠোয়।
            </p>
            <p>ভারতের নানা জায়গায় ঘুরেছি সেই বৃত্তান্ত এখন এখানে লিখে রাখবো।</p>
            <p>
              ভ্রমণ পিপাসু আমরা এখন কোন ছুটির তোয়াক্কা করিনা, বছরের যেকোন সময়ে
              বেড়িয়ে পড়লেই হলো। মনে আছে, ছোট বেলায় বেড়াতে যেতাম কতো হাঙ্গামা
              করে,বিস্তর লটবহর নিয়ে। এখন ছিমছাম ভ্রমণ। একটি স্মার্টফোন ও টাকা
              থাকলেই হলো, সবকিছু হাতের মুঠোয়।
            </p>
            <p>ভারতের নানা জায়গায় ঘুরেছি সেই বৃত্তান্ত এখন এখানে লিখে রাখবো।</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://source.unsplash.com/random/700x700/?nature"
              alt=""
              className="img-fluid rounded-circle d-none d-md-block about-img"
            />
          </div>
        </div>
        <hr />
      </div>
    </section>

    <section className="mt-4">
      <div className="container">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <a href="#">
                  <img className="img-fluid rounded img-sf" alt="" />
                </a>
              </div>
              <div className="col-lg-6 mt-4">
                <h2 className="card-title">আমেরিকা ভ্রমণ</h2>
                <p className="card-text">
                  আমরা 20 ফেব্রুয়ারর সকাল 7 টায় (ভারতীয় সময় 20 ফেব্রুয়ারর
                  সন্ধ্যা সাড়ে আটটা ) সান ফ্রান্সিসড়কা ফনড়মরি। ইরমড়েশন এ লম্বা
                  লাইন রিল, ঘন্টা রতড়নক ফলড়েড়ি ফব্ড়রাড়ত। ব্ুয়া আর রররন োরে রনড়য়
                  আমাড়ের রনড়ত এড়সরিল। রররন এখন ভাড়লা োরে চালায়, license ও ফেড়য়
                  ফেড়ি। ফেরার সময় ওই োেী চারলড়য় ব্ারে রনড়য় এড়লা। েুেুড়র
                  ফখড়য়ড়েড়য় আর ঘুমাইরন।{" "}
                </p>
                <Link to="/travel/123" className="btn btn-primary">
                  Read More &rarr;
                </Link>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            Posted on January 1, 2017 by
            <a href="#">Start Bootstrap</a>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <a href="#">
                  <img
                    className="img-fluid rounded"
                    src="http://placehold.it/750x300"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-lg-6">
                <h2 className="card-title">Post Title</h2>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a
                  laboriosam. Dicta expedita corporis animi vero voluptate
                  voluptatibus possimus, veniam magni quis!
                </p>
                <a href="#" className="btn btn-primary">
                  Read More &rarr;
                </a>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            Posted on January 1, 2017 by
            <a href="#">Start Bootstrap</a>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <a href="#">
                  <img
                    className="img-fluid rounded"
                    src="http://placehold.it/750x300"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-lg-6">
                <h2 className="card-title">Post Title</h2>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a
                  laboriosam. Dicta expedita corporis animi vero voluptate
                  voluptatibus possimus, veniam magni quis!
                </p>
                <a href="#" className="btn btn-primary">
                  Read More &rarr;
                </a>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            Posted on January 1, 2017 by
            <a href="#">Start Bootstrap</a>
          </div>
        </div>

        <ul className="pagination justify-content-center mb-4">
          <li className="page-item">
            <a className="page-link" href="#">
              &larr; Older
            </a>
          </li>
          <li className="page-item disabled">
            <a className="page-link" href="#">
              Newer &rarr;
            </a>
          </li>
        </ul>
      </div>
    </section>
  </Fragment>
);

export default TravelLanding;
