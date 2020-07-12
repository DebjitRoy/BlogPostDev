import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const TravelPost = (props) => {
  const [postState, changePostState] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/posts/${props.match.params.id}`);
        // console.log(res.data);
        changePostState(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    postState && (
      <Fragment>
        <section className="post-detail">
          <div className="container">
            <h1 className="mt-4 mb-3">{postState.data.title}</h1>

            {/* <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">প্রধান পাতা</a>
              </li>
              <li className="breadcrumb-item active">ভ্রমণিকা</li>
            </ol> */}

            <div className="row">
              <div className="col-lg-8 centered">
                <img
                  className="img-fluid rounded"
                  // src={`/uploads/${postState.data.photoHero}`}
                  src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${postState.data.photoHero}`}
                  alt=""
                />

                <hr />

                <p>{`Posted on ${moment(postState.data.createdAt).format(
                  "DD-MM-YYYY"
                )}`}</p>
                <p>{postState.data.additionalInfo}</p>
                <hr />
              </div>
              {/* <div className="col-md-4">
                <div className="visited-card card mb-4">
                  <h5 className="card-header">Visited</h5>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <i className="far fa-eye"></i>
                        <span>{postState.data.visited}</span>
                      </div>
                      <div className="col-6">
                        <i className="far fa-heart"></i>
                        <span>{postState.data.liked}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-sm-none d-md-block card mb-4">
                  <h5 className="card-header">Give a Like</h5>
                  <div className="card-body">
                    পোস্টটি ভালোলাগলে Like ও Share করুন
                    <div className="visited-card d-flex justify-content-center">
                      <i className="fas fa-thumbs-up p-3"></i>
                      <i className="fas fa-share-alt p-3"></i>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="container my-4">
              {postState.data.content
                ? postState.data.content.map((section) => (
                    <div key={section._id}>
                      <p className="lead">
                        <b>{section.header}</b>
                      </p>
                      <p>{section.content}</p>
                      {section.image ? (
                        <div className="card col-md-8 centered">
                          <div className="card-body section-image">
                            <img
                              alt=""
                              className="img-fluid"
                              src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${section.image}`}
                            />
                          </div>
                          {section.imgDescription ? (
                            <div className="card-footer">
                              {section.imgDescription}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ))
                : null}
            </div>

            <hr />
            {/* <div className="d-block d-sm-none card mb-4">
              <h5 className="card-header">Give a Like</h5>
              <div className="card-body">
                পোস্টটি ভালোলাগলে Like ও Share করুন
                <div className="visited-card d-flex justify-content-center">
                  <i className="fas fa-thumbs-up p-3"></i>
                  <i className="fas fa-share-alt p-3"></i>
                </div>
              </div>
            </div> */}

            {/* <div className="card my-4">
              <h5 className="card-header">Leave a Comment:</h5>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <textarea className="form-control" rows="3"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className="media mb-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter 1</h5>
                আজ সারারেন ফঘারা হড়লা ফডথ ভযারল। আযররড়জানা আর ফনভাো রাড়জযর
                সীমান্ত অঞ্চল জড়ুে এই ফডথ ভযারল। রমলরেটাস ফথড়ক ফভার োঁচটায়
                ফব্ররড়য় সাড়ে ব্াড়রাটা নাোে ফডথ ভযারলর এরি েড়য়ড়ন্ট এড়স ফেৌৌঁিলাম
              </div>
            </div>

            <div className="media mb-4">
              <img
                className="d-flex mr-3 rounded-circle"
                src="http://placehold.it/50x50"
                alt=""
              />
              <div className="media-body">
                <h5 className="mt-0">Commenter 2</h5>
                আজ সারারেন ফঘারা হড়লা ফডথ ভযারল। আযররড়জানা আর ফনভাো রাড়জযর
                সীমান্ত অঞ্চল জড়ুে এই ফডথ ভযারল। রমলরেটাস ফথড়ক ফভার োঁচটায়
                ফব্ররড়য় সাড়ে ব্াড়রাটা নাোে ফডথ ভযারলর এরি েড়য়ড়ন্ট এড়স ফেৌৌঁিলাম
              </div>
            </div> */}
          </div>
        </section>
      </Fragment>
    )
  );
};

export default TravelPost;
