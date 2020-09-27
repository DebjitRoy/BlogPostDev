import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import TravelItem from "./TravelItem";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

const BooksLanding = () => {
  const [bookListState, changeBookListState] = useState(null);
  const [paginationState, changePaginationState] = useState(null);
  const [currentPage, changeCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/posts?postType=books&limit=20&page=${currentPage}&select=title,gist,photoHero,createdAt`
        );
        changeBookListState(res.data.data);
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
              <h1>মনের আনন্দ</h1>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p>
                ব‌ই পড়তে ভালোবাসি ছোট থেকেই। সব রকমের ব‌ই, রবীন্দ্রনাথ,
                বঙ্কিমচন্দ্র, শরৎচন্দ্র থেকে আধুনিক লেখক। বিভূতিভূষণ
                বন্দোপাধ্যায়ের লেখা পড়তে খুব ভালো লাগে।
              </p>
              <p>
                ব‌ই পড়তে পড়তে কখনো কালকূটের সাথে পথ চলি, কখনো ঋজু‌দার সঙ্গে
                জঙ্গলে ঘুরে বেড়াই, কখনো নীললোহিতের সাথে দিকশূণ‍্যপুরে পাড়ি জমাই।
                আবার যখন ঠাকুরের ব‌ই পড়ি মন ঘরের কোনায় স্থির হয়ে বসে।
                <br />
                ব‌ই পড়ার আনন্দ ছাড়াও ভালো লাগে পছন্দের ব‌ই নিয়ে আলাপ আলোচনা
                করতে।
              </p>
              <p>
                আগে বেশিরভাগ সিনেমা হতো বিখ্যাত লেখকের ব‌ই থেকে গল্প নিয়ে। তাই
                সেই সব সিনেমা দেখতে যত ভালো লাগতো সেগুলো নিয়ে নিজেদের মধ্যে গল্প
                করতেও ভালো লাগত। এখনো অনেক ভালো সিনেমা তৈরী হয়। যেগুলো ভালো লাগে
                সেগুলো নিয়ে গল্প করতে ইচ্ছে করে।
              </p>
              <p>
                গান শোনার আনন্দ সবার সেরা। গান মনে আশ্চর্য প্রশান্তি এনে দেয়।
                সুর এমনই একটা মাধ‍্যম যা গাছ ও জীবজন্তুও নাকি তা শোনে এবং আনন্দ
                পায়। আমাদের দাড়ি‌ওলা বুড়ো থেকে বাউল ,টপ্পা, আধুনিক বাংলা ,
                হিন্দি গান, রাগাশ্রয়ী, গজল সব উপভোগ করি, ভালোবাসি সেতার, সরোদ,
                বাঁশি শুনতেও।
              </p>
              <p>
                বাঙালি গিন্নি, আর আড্ডা দিতে ভালোবাসি না, তা কখনো হয়?
                <br />
                নিখাদ নির্ভেজাল আড্ডা দিতে পারি ঘন্টার পর ঘন্টা। শুধু একটা জিনিস
                থেকে নিজেকে সরিয়ে রাখতে চাই, তা হলো খবরের কাগজের জবর খবর। যেটুকু
                জানলে চলে সেটুকু জেনেই আমি খুশি। ভালো লাগে ঠাকুর, মা স্বামীজীর
                কথা পড়তে, জানতে।
              </p>
              <p>মনকে খুশি রাখতে এইগুলো আমার পেলেই চলে যায়।</p>
              <p>
                দিন যত গড়াচ্ছে, যত অস্তাচলের দিকে এগিয়ে যাচ্ছি, পুরোনো কথা
                ভাবতে, বলতে খুব ভালো লাগে। কর্মহীন অবসর জীবনকে আনন্দময় রাখতে যা
                প্রয়োজন তা হলো আনন্দ উপভোগ করার ক্ষমতা‌কে টিকিয়ে রাখা, বাঁচিয়ে
                রাখা, মুগ্ধ হতে, বিস্মিত হতে পারা। মনকে আনন্দিত হতে দেওয়া।
              </p>
            </div>
            <div className="col-md-4">
              <img
                src="https://source.unsplash.com/random/700x700/?books"
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
              {bookListState && (
                <ul className="timeline">
                  {bookListState.map((card) => (
                    <li>
                      <div class="timeline-badge">
                        <div className="date">
                          {moment(card.createdAt).format("DD")}
                        </div>
                        <div className="month">
                          {moment(card.createdAt).format("MMM")}
                        </div>
                      </div>
                      <TravelItem data={card} key={card._id} postType="books" />
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
                      &larr; আগের
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
                      পরের &rarr;
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

export default BooksLanding;
