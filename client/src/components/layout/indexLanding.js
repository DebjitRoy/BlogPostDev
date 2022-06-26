import React, { Fragment, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const IndexLanding = () => {
  const [allListState, changeAllListState] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allRes = await axios.get(
          `/api/posts?limit=500&select=title,postType,createdAt`
        );
        const allTravels = allRes.data.data.filter(
          (post) => post.postType === "travel"
        );
        const allBooks = allRes.data.data.filter(
          (post) => post.postType === "books"
        );
        const allMiscls = allRes.data.data.filter(
          (post) => post.postType === "miscl"
        );
        const allGuests = allRes.data.data.filter(
          (post) => post.postType === "guest"
        );
        // console.log("All", allRes.data.data);
        // console.log("Travel", allTravels);
        // console.log("Book", allBooks);
        // console.log("Guest", allGuests);
        // console.log("Misc", allMiscls);

        const posts = {
          all: allRes.data.data,
          travel: allTravels,
          books: allBooks,
          guest: allGuests,
          miscl: allMiscls,
        };
        changeAllListState(posts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const getPostType = (postType) => {
    switch (postType) {
      case "travel":
        return "ভ্রমণিকা";
      case "books":
        return "মনের আনন্দ";
      case "miscl":
        return "টুকিটাকি";
      case "guest":
        return "অতিথির কলম";
    }
  };
  const selectPostType = (postType) => {
    console.log("Selected Type", postType);
    setSelectedPostType(postType);
  };
  return (
    <Fragment>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>সূচিপত্র</h1>
            </div>
          </div>
        </div>
      </header>
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
              <section id="posts">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header pt-4">
                          <ul class="nav nav-pills card-header-pills">
                            <li class="nav-item">
                              <span
                                class={`nav-link ${
                                  selectedPostType === "all" && "active"
                                }`}
                                onClick={() => selectPostType("all")}
                              >
                                সকল
                              </span>
                            </li>
                            <li class="nav-item">
                              <span
                                class={`nav-link ${
                                  selectedPostType === "travel" && "active"
                                }`}
                                onClick={() => selectPostType("travel")}
                              >
                                ভ্রমণিকা
                              </span>
                            </li>
                            <li class="nav-item">
                              <span
                                class={`nav-link ${
                                  selectedPostType === "books" && "active"
                                }`}
                                onClick={() => selectPostType("books")}
                              >
                                মনের আনন্দ
                              </span>
                            </li>
                            <li class="nav-item">
                              <span
                                class={`nav-link ${
                                  selectedPostType === "miscl" && "active"
                                }`}
                                onClick={() => selectPostType("miscl")}
                              >
                                টুকিটাকি
                              </span>
                            </li>
                            <li class="nav-item">
                              <span
                                class={`nav-link ${
                                  selectedPostType === "guest" && "active"
                                }`}
                                onClick={() => selectPostType("guest")}
                              >
                                অতিথির কলম
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body">
                          <table className="table table-striped">
                            <thead className="thead-dark">
                              <tr>
                                <th>তারিখ</th>
                                <th>শিরোনাম</th>
                                <th>বিভাগ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allListState &&
                                allListState[selectedPostType] &&
                                allListState[selectedPostType].map(
                                  (post, idx) => (
                                    <tr key={post._id}>
                                      <td>
                                        <div class="timeline-badge">
                                          <div className="date">
                                            {moment(post.createdAt).format(
                                              "DD"
                                            )}
                                          </div>
                                          <div className="month">
                                            {moment(post.createdAt).format(
                                              "MMM"
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <Link
                                          to={`/${post.postType}/${post._id}`}
                                        >
                                          {`${post.title}  `}
                                          <i className="fas fa-angle-double-right"></i>
                                        </Link>
                                      </td>
                                      <td>{getPostType(post.postType)}</td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Fragment>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default IndexLanding;
