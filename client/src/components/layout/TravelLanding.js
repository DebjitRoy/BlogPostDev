import React, { Fragment, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import TravelItem from "./TravelItem";
import moment from "moment";

const TravelLanding = () => {
  const [travelListState, changeTravelListState] = useState(null);
  const [paginationState, changePaginationState] = useState(null);
  const [currentPage, changeCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/posts?postType=travel&limit=100&page=${currentPage}&select=title,gist,photoHero,createdAt`
        );
        changeTravelListState(res.data.data);
        changePaginationState(res.data.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
                এখন আর ভ্রমণের জন্যে ছুটির তোয়াক্কা করতে হয়না। বছরের যেকোন সময়ে
                বেড়িয়ে পড়তে পারলেই হলো।শুধু রেস্তো থাকা চাই। এখন তো গুগল,
                বিভিন্ন ট্রাভেল গাইড বুক, ট‍্যুর অপারেটর সংগঠন, পর্যটন মেলা --
                ভ্রমণ অনেক সহজ করে দিয়েছে।
              </p>
              <p>
                মনে আছে ছোট বেলায় বাবা মার সাথে বেড়াতে যেতাম একটা টাইম টেবিল ও
                একখানা ভ্রমণ সঙ্গী ভরসা করে। যাবতীয় খরচের টাকা একটা কাঁধব‍্যাগে
                থাকতো,পথে ঘাটে চুরি চামারির অত ভয় ছিল না।
                <br />
                এখন পরিবার ছাড়াও সাথে আছে প্রয়াসের বন্ধুরা, স্বামীর
                কর্মক্ষেত্রের বন্ধুরা পরিবার সহ, আছে ভাইবোনের দল ,সুযোগ সুবিধা
                মতো বেড়িয়ে পড়ি।
              </p>
              <p>
                যখন ট‍্যুর অপারেটরদের সাথে প‍্যাকেজ প্রোগ্রাম করি তখন তো কোন
                চিন্তা‌‍ই থাকে না, কোথায় থাকবো কি দেখব তারা‌ই ঠিক করে। নিজেরা
                যখন প্ল্যান করি তখন বিভিন্ন পত্রিকা, গুগল ঘেঁটে চারমাস আগে
                ট্রেনের টিকিট কেটে তৈরী হ‌ই।
              </p>
              <p>
                কতো জায়গায় ঘুরে বেড়ালাম এই জীবনে আরো কতো বেড়াবো -- কারণ ভ্রমণ
                আমার রক্তে। একটা যাযাবরী নেশা।
              </p>
              <p>
                এরজন্য অনেক কিছু ছাড়তে হয়, অন‍্য কোন বিলাসিতা করি না, সাধারণ
                মানের জীবন যাপন করি একটাই আমাদের আকাঙ্ক্ষা থাকে কবে ঝোলা কাঁধে
                বেড়িয়ে পড়তে পারবো। যেখানে যেখানে গেছি স্মৃতি পটে ধরে রাখা ছাড়াও
                ধরে রেখেছি ডায়রি‌র পাতায়, ক‍্যামেরায় ধরা আছে ছবি। সেগুলো যখন
                দেখি, মনে মনে হাজির হ‌ই সেখানে, ভরদুপুরে পৌঁছে যাই মীনাক্ষী
                মন্দিরের ঠান্ডা অলিন্দে , কন্যা কুমারিকায় শান্ত সূর্যাস্ত দেখি।
              </p>
              <p>
                আমার এই ভালো লাগা মুহুর্ত গুলো, সুন্দর সুন্দর জায়গায় ভ্রমণ,
                নানান অভিজ্ঞতা ধরে রাখতে চাই ভ্রমণিকা‌র পাতায় ভাগ করে নিতে চাই
                সেই আনন্দ মুহূর্তগুলো সবার সাথে।
              </p>
              <p>
                এই ভ্রমণ কাহিনী লেখার আনন্দ আমার নিজের। কেউ যদি পাঠ করে আনন্দ
                পান ও সেটা আমাকে জানান নিজেকে ধন‍্য মনে করবো। <br />
                লেখার সঙ্গে ছবি দেওয়ার চেষ্টা করব ,তথ‍্য ভারাক্রান্ত করবো না,
                কারন ত‍থ‍্য এখন সহজলভ্য এবং অনেক পরিবর্তন হয়েছে দ্রষ্টব্য
                স্থানগুলির ।
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

      <section>
        <div className="container centered-container">
          {isLoading ? (
            <div className="loading">
              <Spinner
                animation="grow"
                role="status"
                size="l"
                className="loading-lg"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Fragment>
              {travelListState && (
                <ul className="timeline">
                  {travelListState.map((card) => (
                    <li>
                      <div class="timeline-badge">
                        <div className="date">
                          {moment(card.createdAt).format("DD")}
                        </div>
                        <div className="month">
                          {moment(card.createdAt).format("MMM")}
                        </div>
                      </div>
                      <TravelItem
                        data={card}
                        key={card._id}
                        postType="travel"
                      />
                    </li>
                  ))}
                </ul>
              )}

              {paginationState && paginationState.totalPage > 1 ? (
                <ul className="pagination justify-content-center mb-4">
                  <li
                    className={`page-item ${
                      !paginationState.prev ? "disabled" : null
                    }`}
                  >
                    <div
                      className="page-link"
                      onClick={() => changeCurrentPage(currentPage - 1)}
                    >
                      &larr; Older
                    </div>
                  </li>
                  <li
                    className={`page-item ${
                      !paginationState.next ? "disabled" : null
                    }`}
                  >
                    <div
                      className="page-link"
                      onClick={() => {
                        changeCurrentPage(currentPage + 1);
                      }}
                    >
                      Newer &rarr;
                    </div>
                  </li>
                </ul>
              ) : null}
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default TravelLanding;
