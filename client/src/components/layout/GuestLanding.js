import React, { Fragment, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import TravelItem from "./TravelItem";
import moment from "moment";

const GuestLanding = () => {
  const [guestListState, changeGuestListState] = useState(null);
  const [paginationState, changePaginationState] = useState(null);
  const [currentPage, changeCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/posts?postType=guest&limit=100&page=${currentPage}&select=title,gist,photoHero,createdAt`
        );
        changeGuestListState(res.data.data);
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
              <h1>অতিথির কলম</h1>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <p>আমার বাতায়নের আঙিনায় অতিথিদের স্বাগতম।</p>
              <p>
                তাঁদের সৃষ্টির স্বাদ আমার পাঠকদের সাথে ভাগ করে নিতে এই বিভাগটি
                চালু করা হলো। যেসব বন্ধু এখানে তাঁদের লেখা পাঠাতে চান, .docx
                ফরম্যাটে অনধিক ৫০০ শব্দের মধ্যে লেখা, সঙ্গে একটি কভার ফটো (৩০০
                kb max) আমার ইমেইল ঠিকানায় (juthika.ray.JR@gmail.com) পাঠাতে
                পারেন। দয়া করে মনে রাখবেন, pdf ফরম্যাট চলবেনা, একমাত্র docx
                ফরম্যাটেই পাঠাতে হবে।
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
              {guestListState && (
                <ul className="timeline">
                  {guestListState.map((card) => (
                    <li>
                      <div class="timeline-badge">
                        <div className="date">
                          {moment(card.createdAt).format("DD")}
                        </div>
                        <div className="month">
                          {moment(card.createdAt).format("MMM")}
                        </div>
                      </div>
                      <TravelItem data={card} key={card._id} postType="guest" />
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

export default GuestLanding;
