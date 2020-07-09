import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import moment from "moment";

const TravelPostEdit = (props) => {
  const [postState, changePostState] = useState(null);
  const [editingState, setEditState] = useState(null);
  const [formState, changeFormState] = useState(null);
  const [mainPhoto, changeMainPhoto] = useState(null);
  // const [isFormSubmitted, setFormSubmitted] = useState(false);
  const history = useHistory();
  useEffect(() => {
    loadPostData();
  }, []);

  const loadPostData = async () => {
    try {
      const res = await axios.get(`/api/posts/${props.match.params.id}`);
      // console.log(res.data);
      changePostState(res.data);
      if (res.data) {
        changeFormState(res.data.data);
      }
      setEditState(null);
      // setFormSubmitted(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateForm = (key, val) => {
    changeFormState({
      ...formState,
      [key]: val,
    });
  };

  const toggleEdit = () => {
    switch (editingState) {
      case "title":
        return (
          <Fragment>
            <input
              type="text"
              className="form-control col-md-5"
              value={formState.title}
              required
              onChange={(evt) => updateForm("title", evt.target.value)}
            />
          </Fragment>
        );
      case "photoHero":
        return (
          <Fragment>
            <div className="custom-file col-md-5 mx-1 py-2">
              <input
                type="file"
                className="custom-file-input"
                id="image"
                onChange={(evt) => changeMainPhoto(evt.target.files[0])}
              />
              <label htmlFor="image" className="custom-file-label">
                {(mainPhoto && mainPhoto.name) || "Choose File"}
              </label>
            </div>
          </Fragment>
        );
    }
  };

  const onEditSubmit = async () => {
    console.log(`submitting ${editingState}`);
    try {
      if (editingState === "photoHero") {
        const fd = new FormData();
        fd.append("file", mainPhoto, mainPhoto.name);
        const resphoto = await axios.put(
          `/api/posts/${props.match.params.id}/upload`,
          fd
        );
      } else {
        const res = await axios.put(`/api/posts/${props.match.params.id}`, {
          [editingState]: formState[editingState],
        });
      }

      // setFormSubmitted(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    postState && (
      <Fragment>
        <section className="post-detail">
          <div className="container">
            {editingState !== "title" && editingState !== "photoHero" ? (
              <h1 className="mt-4 mb-3">
                {postState.data.title}
                <span className="mx-3">
                  <i
                    className="px-1 icon fas fa-pencil-alt"
                    onClick={() => setEditState("title")}
                  ></i>{" "}
                  <i
                    className="px-1 icon fas fa-image"
                    onClick={() => setEditState("photoHero")}
                  ></i>{" "}
                </span>
              </h1>
            ) : (
              <div className="row my-2">
                {/* <label htmlFor="image">Upload Cover Image</label> */}
                {toggleEdit()}
                <button className="btn btn-primary mx-1" onClick={onEditSubmit}>
                  Submit
                </button>
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => setEditState(null)}
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="row">
              <div className="col-lg-8">
                <img
                  className="img-fluid rounded"
                  // src={`/uploads/${postState.data.photoHero}`}
                  src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${postState.data.photoHero}`}
                  alt=""
                />
                <p>{`Posted on ${moment(postState.data.createdAt).format(
                  "DD-MM-YYYY"
                )}`}</p>
                <hr />
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <h5 className="card-header">
                    Search By Tags
                    {editingState !== "searchBy" ? (
                      <i
                        className="icon fas fa-pencil-alt px-2"
                        onClick={() => setEditState("searchBy")}
                      ></i>
                    ) : null}
                  </h5>
                  <div className="card-body">
                    <p>{formState && formState.searchBy.join(",")}</p>
                  </div>
                  {editingState === "searchBy" ? (
                    <div className="card-footer">
                      <button
                        className="btn btn-primary mx-1"
                        onClick={onEditSubmit}
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-secondary mx-1"
                        onClick={() => setEditState(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="d-sm-none d-md-block card mb-4">
                  <h5 className="card-header">
                    Gist
                    {editingState !== "gist" ? (
                      <i
                        className="icon fas fa-pencil-alt px-2"
                        onClick={() => setEditState("gist")}
                      ></i>
                    ) : null}
                  </h5>
                  <div className="card-body">
                    <p>{formState && formState.gist}</p>
                  </div>
                  {editingState === "gist" ? (
                    <div className="card-footer">
                      <button
                        className="btn btn-primary mx-1"
                        onClick={onEditSubmit}
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-secondary mx-1"
                        onClick={() => setEditState(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="container my-4">
              {postState.data.content
                ? postState.data.content.map((section) => (
                    <div key={section._id}>
                      <p>
                        <i className="icon fas fa-pencil-alt px-2"></i>{" "}
                        <i className="icon fas fa-plus px-2 "></i>{" "}
                        <i className="icon fas fa-trash px-2 icon"></i>
                      </p>

                      <p className="lead">
                        <b>{section.header}</b>
                      </p>
                      <p>{section.content}</p>
                      {section.image ? (
                        <div className="card col-md-8 centered">
                          <div className="card-body">
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
                      <hr />
                    </div>
                  ))
                : null}
              <span>
                <i className="icon fas fa-plus px-2 "></i>Add a new Section
              </span>
            </div>
            <div className="d-block d-sm-none card mb-4">
              <h5 className="card-header">Give a Like</h5>
              <div className="card-body">
                পোস্টটি ভালোলাগলে Like ও Share করুন
                <div className="visited-card d-flex justify-content-center">
                  <i className="icon fas fa-thumbs-up p-3"></i>
                  <i className="icon fas fa-share-alt p-3"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  );
};

export default TravelPostEdit;
