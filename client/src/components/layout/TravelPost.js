import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

import ImageModal from "./ImageModal";

const TravelPost = (props) => {
  const [postState, changePostState] = useState(null);
  const [commentsState, changeCommentsState] = useState([]);
  const [isCommentSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isMainLoading, setMainLoading] = useState(false);
  const [isOpenImage, setOpenImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [commentForm, updateCommentForm] = useState({
    title: "",
    description: "",
    username: "",
  });
  useEffect(() => {
    (async () => {
      try {
        setMainLoading(true);
        const res = await axios.get(`/api/posts/${props.match.params.id}`);
        // console.log(res.data);
        changePostState(res.data);
        const comments = await axios.get(
          `/api/posts/${props.match.params.id}/comments`
        );
        changeCommentsState(comments.data.data);
        setFormSubmitted(false);
        setLoading(false);
        setMainLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isCommentSubmitted]);

  const commentSubmitted = async () => {
    try {
      setLoading(true);
      await axios.post(
        `/api/posts/${props.match.params.id}/comments`,
        commentForm
      );
      setLoading(false);
      setFormSubmitted(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeImage = () => {
    setOpenImage(false);
  };

  return (
    postState && (
      <Fragment>
        <section className="post-detail">
          <div className="container">
            {isMainLoading ? (
              <div className="loading centered-container">
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
                <h1 className="mt-4 mb-3">{postState.data.title}</h1>

                <div className="row">
                  <div className="col-lg-8 centered">
                    <img
                      className="img-fluid rounded"
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
                                  onClick={() => {
                                    setCurrentImage(section.image);
                                    setOpenImage(true);
                                  }}
                                />
                              </div>
                              {section.imgDescription ? (
                                <div className="card-footer section-image-footer">
                                  {section.imgDescription}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                          {section.video && section.video.length ? (
                            <div className="card video-card col-md-8 centered">
                              <div className="card-body section-image">
                                <div className="embed-responsive embed-responsive-16by9">
                                  <iframe
                                    className="embed-responsive-item"
                                    src={`https://www.youtube.com/embed/${section.video}?autoplay=1`}
                                  ></iframe>
                                </div>
                              </div>
                              <div className="card-footer section-image-footer">
                                <div class="d-flex justify-content-between">
                                  <span>{section.videoDescription}</span>
                                  <i
                                    class="fa fa-expand"
                                    aria-hidden="true"
                                    onClick={() => {
                                      // setCurrentImage(section.image);
                                      setCurrentVideo(section.video);
                                      setOpenImage(true);
                                    }}
                                  ></i>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))
                    : null}
                </div>

                <hr />

                <div className="comment-form card my-4">
                  <h5 className="card-header">মতামত জানান</h5>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        {/* <input
          className="form-control mb-2"
          type="text"
          placeholder="বিষয়"
          maxLength="100"
          value={commentForm.title}
          onChange={(evt) =>
            updateCommentForm({
              ...commentForm,
              title: evt.target.value,
            })
          }
        /> */}
                        <textarea
                          className="form-control mb-2"
                          rows="3"
                          placeholder="আপনার মতামত"
                          maxLength="500"
                          value={commentForm.description}
                          onChange={(evt) =>
                            updateCommentForm({
                              ...commentForm,
                              description: evt.target.value,
                            })
                          }
                        ></textarea>

                        <input
                          className="form-control "
                          type="text"
                          placeholder="আপনার নাম"
                          maxLength="100"
                          value={commentForm.username}
                          onChange={(evt) =>
                            updateCommentForm({
                              ...commentForm,
                              username: evt.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn"
                        onClick={commentSubmitted}
                        disabled={
                          !commentForm.username || !commentForm.description
                        }
                      >
                        {isLoading ? (
                          <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {commentsState &&
                  commentsState.length > 0 &&
                  commentsState.map((comment) => (
                    <div className="media mb-4" key={comment._id}>
                      <div className="mr-3 rounded-circle comment-icon">
                        <div className="icon-day">
                          {moment(comment.createdAt).format("DD")}
                        </div>
                        <div className="icon-mon">
                          {moment(comment.createdAt).format("MMM")}
                        </div>
                      </div>
                      <div className="media-body">
                        <h5 className="mt-0">{comment.title}</h5>
                        <blockquote>{comment.description}</blockquote>
                        <cite> - {comment.username}</cite>
                      </div>
                    </div>
                  ))}
              </Fragment>
            )}
          </div>
        </section>

        <ImageModal
          show={isOpenImage}
          onHide={closeImage}
          image={currentImage}
          video={currentVideo}
        />
      </Fragment>
    )
  );
};

export default TravelPost;
