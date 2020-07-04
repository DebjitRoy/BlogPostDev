import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const TravelItem = ({ data }) => (
  <div className="card mb-4">
    <div className="card-body">
      <div className="row">
        <div className="col-lg-6">
          <a href="#">
            <img
              className="img-fluid rounded"
              src={`/uploads/photo_${data._id}.jpg`}
              alt=""
            />
          </a>
        </div>
        <div className="col-lg-6 mt-4">
          <h2 className="card-title">{data.title}</h2>
          <p className="card-text">{data.gist}</p>
          <Link to={`/travel/${data._id}`} className="btn btn-primary">
            Read More &rarr;
          </Link>
        </div>
      </div>
    </div>
    <div className="card-footer text-muted">
      {`Posted on ${moment(data.createdAt).format("DD-MM-YYYY")}`}
    </div>
  </div>
);

export default TravelItem;
