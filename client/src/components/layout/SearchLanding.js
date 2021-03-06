import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import TravelItem from "./TravelItem";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

const SearchLanding = (props) => {
  const [searchListState, changeSearchListState] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const [paginationState, changePaginationState] = useState(null);
  const [currentPage, changeCurrentPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/posts?searchBy[in]=${props.match.params.search}`
        );
        changeSearchListState(res.data.data);
        setLoading(false);
        // changePaginationState(res.data.pagination);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.match.params.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <header id="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto text-center">
              <h1>সন্ধান ফলাফল</h1>
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
            searchListState && (
              <ul className="timeline">
                {searchListState.map((card) => (
                  <li>
                    <div class="timeline-badge">
                      <div className="date">
                        {moment(card.createdAt).format("DD")}
                      </div>
                      <div className="month">
                        {moment(card.createdAt).format("MMM")}
                      </div>
                    </div>
                    <TravelItem data={card} key={card._id} postType="travel" />
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default SearchLanding;
