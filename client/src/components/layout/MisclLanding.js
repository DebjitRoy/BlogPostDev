import React, { Fragment, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import TravelItem from "./TravelItem";
import moment from "moment";

const MisclLanding = () => {
  const [misclListState, changeMisclListState] = useState(null);
  const [paginationState, changePaginationState] = useState(null);
  const [currentPage, changeCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/posts?postType=miscl&limit=100&page=${currentPage}&select=title,gist,photoHero,createdAt`
        );
        changeMisclListState(res.data.data);
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
              <h1>টুকিটাকি</h1>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p>
                স্মৃতি‌র তোরঙ্গটি খুলতেই দেখি কতো কিছু জমে আছে তার মধ্যে।
                <br />
                আমার ছেলেবেলা আমার মেয়েবেলা আমার ঘরসংসার বেলা।
              </p>
              <p>
                কতো মধুর স্মৃতি, কতো পাওয়া না পাওয়ার গল্প । কত কিছু দেখলাম, কত
                কিছু অদেখা অচেনা রয়ে গেল। কতো কিছু পেলাম, কতো হারিয়ে ফেললাম, কতো
                লোকের সাথে দেখা হল, কতো লোককে ভুলে গেলাম।
              </p>
              <p>
                জাদুকরের বাক্সের মতো আমার এই তোরঙ্গটি নানা ভাবনা চিন্তা, ইচ্ছা,
                আশা, কল্পনা দিয়ে ভরা।
              </p>
              <p>
                টুকিটাকি তে টুকরো কথা টুকরো স্মৃতি টুকরো গল্প দিয়ে ভরিয়ে দেব।
                যেমন পুরোনো কথা থাকবে তেমনই বর্তমান ও ভবিষ্যতের ও ছায়াপাত হবে
                এখানে।
                <br />
                সুদিন দুর্দিন-- যেভাবে দিন কাটছে সেভাবেই চলবে টুকিটাকির পাতা।
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
              {misclListState && (
                <ul className="timeline">
                  {misclListState.map((card) => (
                    <li>
                      <div class="timeline-badge">
                        <div className="date">
                          {moment(card.createdAt).format("DD")}
                        </div>
                        <div className="month">
                          {moment(card.createdAt).format("MMM")}
                        </div>
                      </div>
                      <TravelItem data={card} key={card._id} postType="miscl" />
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

export default MisclLanding;
