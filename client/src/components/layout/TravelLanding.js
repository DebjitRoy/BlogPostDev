import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import TravelItem from "./TravelItem";

const TravelLanding = () => {
  const [travelListState, changeTravelListState] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "/api/posts?postType=travel&limit=5&select=title,gist,photoHero,createdAt"
        );
        changeTravelListState(res.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
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
              <p>
                ভারতের নানা জায়গায় ঘুরেছি সেই বৃত্তান্ত এখন এখানে লিখে রাখবো।
              </p>
              <p>
                ভ্রমণ পিপাসু আমরা এখন কোন ছুটির তোয়াক্কা করিনা, বছরের যেকোন সময়ে
                বেড়িয়ে পড়লেই হলো। মনে আছে, ছোট বেলায় বেড়াতে যেতাম কতো হাঙ্গামা
                করে,বিস্তর লটবহর নিয়ে। এখন ছিমছাম ভ্রমণ। একটি স্মার্টফোন ও টাকা
                থাকলেই হলো, সবকিছু হাতের মুঠোয়।
              </p>
              <p>
                ভারতের নানা জায়গায় ঘুরেছি সেই বৃত্তান্ত এখন এখানে লিখে রাখবো।
              </p>
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
          {travelListState &&
            travelListState.map((card) => (
              <TravelItem data={card} key={card._id} />
            ))}

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
};

export default TravelLanding;
