import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import DeleteModal from "./DeleteModal";

const TravelPostEdit = (props) => {
  const [postState, changePostState] = useState(null);
  const [editingState, setEditState] = useState(null);
  const [formState, changeFormState] = useState(null);
  const [mainPhoto, changeMainPhoto] = useState(null);
  const [sectionPhoto, changeSectionPhoto] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [editSectionIdx, setEditingSection] = useState(null);
  const [isDeleteModalOpen, changeDeleteModalOpen] = useState(false);
  // const [currentSection, setCurrentSection] = useState(null);
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

      case "searchBy":
        return (
          <Fragment>
            <textarea
              name="editor1"
              className="form-control"
              value={formState.searchBy || ""}
              required
              onChange={(evt) =>
                updateForm("searchBy", evt.target.value.split(","))
              }
            ></textarea>
          </Fragment>
        );

      case "gist":
        return (
          <Fragment>
            <textarea
              name="editor1"
              className="form-control"
              value={formState.gist || ""}
              required
              onChange={(evt) => updateForm("gist", evt.target.value)}
            ></textarea>
          </Fragment>
        );

      case "additionalInfo":
        return (
          <Fragment>
            <div className="row">
              <input
                type="text"
                className="form-control col-md-8"
                value={formState.additionalInfo}
                onChange={(evt) =>
                  updateForm("additionalInfo", evt.target.value)
                }
              />
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
          </Fragment>
        );
    }
  };

  const onEditSection = (category, editSection, value) => {
    const updatedSection = [...formState.content];
    const idx = updatedSection.findIndex(
      (sect) => sect._id === editSection._id
    );
    const currSection = {
      ...updatedSection[idx],
      [category]: value,
    };
    updatedSection.splice(idx, 1, currSection);
    changeFormState({
      ...formState,
      content: updatedSection,
    });
  };

  const removeSection = async () => {
    const updatedSection = [...formState.content];
    if (editingState === "sectionImage") {
      updatedSection[editSectionIdx] = {
        ...updatedSection[editSectionIdx],
        image: null,
        imgDescription: null,
      };
    } else {
      updatedSection.splice(editSectionIdx, 1);
    }

    changeFormState({
      ...formState,
      content: updatedSection,
    });
    await axios.put(`/api/posts/${props.match.params.id}`, {
      content: updatedSection,
    });
    window.location.reload();
  };

  const onEditSubmit = async () => {
    console.log(`submitting ${editingState}`);
    try {
      switch (editingState) {
        case "photoHero": {
          setLoading(true);
          const fd = new FormData();
          fd.append("file", mainPhoto, mainPhoto.name);
          const resphoto = await axios.put(
            `/api/posts/${props.match.params.id}/upload`,
            fd
          );
          setLoading(false);
          break;
        }
        case "sectionImage": {
          setLoading(true);
          const fd = new FormData();
          const sectionId = formState.content[editSectionIdx]._id;
          fd.append("file", sectionPhoto, sectionPhoto.name);
          const res = await axios.put(
            `/api/posts/${props.match.params.id}/sectionupload/${sectionId}`,
            fd
          );
          setLoading(false);
          break;
        }
        default: {
          const res = await axios.put(`/api/posts/${props.match.params.id}`, {
            [editingState]: formState[editingState],
          });
        }
      }
      changeSectionPhoto(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const onImageDescriptionChanged = async () => {
    await axios.put(`/api/posts/${props.match.params.id}`, {
      content: formState.content,
    });
    setEditState(null);
    window.location.reload();
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
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    <span>Submit</span>
                  )}
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
                <p>
                  Additional Info: {postState.data.additionalInfo}
                  {editingState !== "additionalInfo" ? (
                    <i
                      className="icon fas fa-pencil-alt px-2"
                      onClick={() => setEditState("additionalInfo")}
                    ></i>
                  ) : null}
                  {toggleEdit()}
                </p>
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
                    {editingState === "searchBy" ? (
                      toggleEdit()
                    ) : (
                      <p>
                        {postState.data && postState.data.searchBy.join(",")}
                      </p>
                    )}
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
                    {editingState === "gist" ? (
                      toggleEdit()
                    ) : (
                      <p>{postState.data && postState.data.gist}</p>
                    )}
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
              {postState.data && postState.data.content
                ? postState.data.content.map((section, idx) => (
                    <div key={section._id}>
                      {(editingState !== "content" &&
                        editingState !== "sectionImage") ||
                      editSectionIdx !== idx ? (
                        <div>
                          <p>
                            <i
                              className="icon fas fa-pencil-alt px-2"
                              onClick={() => {
                                setEditState("content");
                                setEditingSection(idx);
                              }}
                            ></i>
                            <i className="icon fas fa-plus px-2"></i>{" "}
                            <i
                              className="icon fas fa-trash px-2"
                              // removeSection(idx)
                              onClick={() => {
                                setEditState("content");
                                setEditingSection(idx);
                                changeDeleteModalOpen(true);
                              }}
                            ></i>
                            <i
                              className="icon fas fa-image px-2"
                              onClick={() => {
                                setEditState("sectionImage");
                                setEditingSection(idx);
                              }}
                            ></i>
                          </p>
                        </div>
                      ) : null}

                      {editingState !== "content" || editSectionIdx !== idx ? (
                        <div>
                          <p className="lead">
                            <b>{section.header}</b>
                          </p>
                          <p>{section.content}</p>
                        </div>
                      ) : null}

                      {editingState === "content" && editSectionIdx === idx ? (
                        <div className="card mb-4">
                          <div className="card-header">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Section Header"
                              value={formState.content[idx].header || ""}
                              onChange={(evt) =>
                                onEditSection(
                                  "header",
                                  section,
                                  evt.target.value
                                )
                              }
                            />
                          </div>
                          <div className="card-body">
                            <textarea
                              name="editor1"
                              className="form-control"
                              placeholder="Section Body"
                              value={formState.content[idx].content || ""}
                              onChange={(evt) =>
                                onEditSection(
                                  "content",
                                  section,
                                  evt.target.value
                                )
                              }
                            ></textarea>
                          </div>
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
                        </div>
                      ) : null}

                      {section.image &&
                      (editingState !== "sectionImage" || editSectionIdx) !==
                        idx ? (
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

                      {editingState === "sectionImage" &&
                      editSectionIdx === idx ? (
                        <div className="card mb-4 col-md-8 centered">
                          <div className="card-header">
                            <div className="custom-file col-md-6 mx-1 mr-3 py-2">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="image"
                                onChange={(evt) =>
                                  changeSectionPhoto(evt.target.files[0])
                                }
                              />

                              <label
                                htmlFor="image"
                                className="custom-file-label"
                              >
                                {(sectionPhoto && sectionPhoto.name) ||
                                  "Choose File"}
                              </label>
                            </div>
                            <button
                              className="btn btn-outline-primary mr-1"
                              onClick={onEditSubmit}
                            >
                              {isLoading ? (
                                <Spinner animation="border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </Spinner>
                              ) : (
                                <span>Submit</span>
                              )}
                            </button>
                            <button
                              className="btn btn-outline-danger mr-1"
                              onClick={() => {
                                setEditingSection(idx);
                                changeDeleteModalOpen(true);
                                changeSectionPhoto(null);
                              }}
                            >
                              Delete Image
                            </button>
                            <button
                              className="close"
                              onClick={() => setEditState(null)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="card-body">
                            {section.image ? (
                              <img
                                alt=""
                                className="img-fluid"
                                src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${section.image}`}
                                // src={sectionPhoto}
                              />
                            ) : null}
                          </div>
                          <div className="card-footer">
                            <div className="row">
                              <input
                                type="text"
                                className="form-control col-md-9"
                                placeholder="Image Description"
                                value={
                                  formState.content[idx].imgDescription || ""
                                }
                                onChange={(evt) =>
                                  onEditSection(
                                    "imgDescription",
                                    section,
                                    evt.target.value
                                  )
                                }
                              />
                              <button
                                className="btn btn-outline-primary mr-2 col-md-2"
                                onClick={onImageDescriptionChanged}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
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
          </div>
        </section>
        <DeleteModal
          // postTitle={currentSection}
          deleteType={editingState}
          isOpen={isDeleteModalOpen}
          closeModal={() => {
            setEditingSection(null);
            changeDeleteModalOpen(false);
          }}
          onPostDelete={() => removeSection()}
        />
      </Fragment>
    )
  );
};

export default TravelPostEdit;
