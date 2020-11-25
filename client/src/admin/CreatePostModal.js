import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const CreatePostModal = ({ isOpen, closeModal }) => {
  const postCategories = ["travel", "books", "miscl", "guest"];
  const postType = {
    travel: "Travel",
    books: "Books",
    miscl: "Miscl",
    guest: "Guest",
  };
  const initialFormState = {
    title: "",
    postType: "travel",
    coverImage: null,
    content: [
      {
        header: null,
        content: null,
        image: null,
        imgDescription: null,
        video: null,
        videoDescription: null,
      },
    ],
    gist: "",
    searchBy: "",
  };
  const [formState, onUpdateForm] = useState(initialFormState);
  const [isLoading, setLoading] = useState(false);
  const [previewCoverImg, setCoverImg] = useState(null);

  const updateForm = (key, val) => {
    onUpdateForm({
      ...formState,
      [key]: val,
    });
  };

  useEffect(() => onUpdateForm(initialFormState), [isOpen]);

  useEffect(() => {
    getCoverImage();
  }, [formState.coverImage]);

  const updateSection = (key, val, idx) => {
    const content = [...formState.content];
    content[idx][key] = val;
    onUpdateForm({
      ...formState,
      content,
    });
  };
  const addSection = () => {
    const blankSection = {
      header: null,
      content: null,
      image: null,
      imgDescription: null,
    };
    // changeSectionState([...sectionsState, blankSection]);
    onUpdateForm({
      ...formState,
      content: [...formState.content, blankSection],
    });
  };
  const deleteSection = (idx) => {
    const sections = [...formState.content];

    sections.splice(idx, 1);
    onUpdateForm({
      ...formState,
      content: sections,
    });
    // changeSectionState([...sectionsState]);
  };

  const isSubmitDisabled = () =>
    formState.title.length < 3 ||
    formState.postType < 3 ||
    (formState.content[0].content && formState.content[0].content.length < 5);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const body = { ...formState };
    const sectionImages = {};
    body.content.forEach((section, idx) => {
      if (section.image) {
        sectionImages[idx] = section.image;
        delete section.image;
      }
    });
    body.searchBy = body.searchBy.length > 0 ? body.searchBy.split(",") : [];
    // console.log(sectionImages);
    delete body.coverImage;
    body.gist =
      body.gist.length > 0 ? body.gist : body.content[0].content.slice(0, 350);
    try {
      const res = await axios.post("/api/posts", body);
      const createdPostId = res.data.data._id;
      if (res.data && formState.coverImage) {
        // console.log(res.data.data._id);
        const fd = new FormData();
        fd.append("file", formState.coverImage, formState.coverImage.name);
        const resphoto = await axios.put(
          `/api/posts/${createdPostId}/upload`,
          fd
        );
        // console.log(resphoto);
      }

      if (Object.keys(sectionImages).length > 0) {
        for (let section of Object.keys(sectionImages)) {
          const sectionId = res.data.data.content[parseInt(section)]._id;
          const fd = new FormData();
          fd.append(
            "file",
            sectionImages[parseInt(section)],
            sectionImages[parseInt(section)].name
          );
          await axios.put(
            `/api/posts/${createdPostId}/sectionupload/${sectionId}`,
            fd
          );
        }
      }

      setLoading(false);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const getCoverImage = () => {
    const fr = new FileReader();
    if (formState && formState.coverImage) {
      const url = fr.readAsDataURL(formState.coverImage);
      console.log("getCoverImage" + url);
      fr.onloadend = function (e) {
        // this.setState({
        //   imgSrc: [fr.result],
        // });
        setCoverImg({
          imgSrc: [fr.result],
        });
      };
      // fd.append("file", formState.coverImage, formState.coverImage.name);
      // return fd;
    }
    return null;
  };

  return (
    <Fragment>
      <Modal show={isOpen} size="lg">
        <ModalHeader className="bg-primary text-white">
          <ModalTitle>Add Post</ModalTitle>
          <button className="close" onClick={closeModal}>
            <span>&times;</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                value={formState.title}
                required
                onChange={(evt) => updateForm("title", evt.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                className="form-control"
                value={formState.postType}
                required
                onChange={(evt) => updateForm("postType", evt.target.value)}
              >
                {postCategories.map((category, idx) => (
                  <option value={category} key={idx}>
                    {postType[category]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tags">Search Tags</label>
              <input
                type="text"
                className="form-control"
                value={formState.searchBy}
                required
                placeholder="Enter Comma separated"
                onChange={(evt) => updateForm("searchBy", evt.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Cover Image</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="image"
                  onChange={(evt) => {
                    // getCoverImage();
                    updateForm("coverImage", evt.target.files[0]);
                  }}
                />
                <label htmlFor="image" className="custom-file-label">
                  {(formState.coverImage && formState.coverImage.name) ||
                    "Choose File"}
                </label>
              </div>
              <small className="form-text text-muted">Max Size 300KB</small>
              {/* <img className="image-preview" src={previewCoverImg} /> */}
            </div>

            <label htmlFor="gist">Post Gist</label>
            <textarea
              name="editor1"
              className="form-control"
              value={formState.gist || ""}
              required
              onChange={(evt) => updateForm("gist", evt.target.value)}
            ></textarea>
            <input
              type="text"
              className="form-control"
              value={formState.additionalInfo}
              placeholder="Additional Information"
              onChange={(evt) => updateForm("additionalInfo", evt.target.value)}
            />
            <hr />
            {formState.content.map((section, idx) => (
              <Fragment key={idx}>
                <div className="form-group">
                  {idx > 0 ? (
                    <div
                      className="new-section ml-auto"
                      onClick={() => deleteSection(idx)}
                    >
                      <i className="far fa-minus-square"></i>
                    </div>
                  ) : null}

                  <label htmlFor="sectionHdr">Section Header</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="optional"
                    value={section.header || ""}
                    onChange={(evt) =>
                      updateSection("header", evt.target.value, idx)
                    }
                  />
                  <label htmlFor="body">Section Body</label>
                  <textarea
                    name="editor1"
                    className="form-control"
                    value={section.content || ""}
                    required
                    onChange={(evt) =>
                      updateSection("content", evt.target.value, idx)
                    }
                  ></textarea>

                  <div className="form-group">
                    <label htmlFor="image">Upload Section Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="image"
                        onChange={(evt) =>
                          updateSection("image", evt.target.files[0], idx)
                        }
                      />
                      <label htmlFor="image" className="custom-file-label">
                        {(section.image && section.image.name) || "Choose File"}
                      </label>
                    </div>
                    <small className="form-text text-muted">
                      Max Size 300KB
                    </small>
                  </div>

                  <label htmlFor="imgHdr">Section Image Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="maximum 100 characters"
                    max="100"
                    value={section.imgDescription || ""}
                    onChange={(evt) =>
                      updateSection("imgDescription", evt.target.value, idx)
                    }
                  />

                  <div className="form-group">
                    <label htmlFor="tags">YouTube Video ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={section.video || ""}
                      onChange={(evt) =>
                        updateSection("video", evt.target.value, idx)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tags">YouTube Video Description</label>
                    <input
                      type="text"
                      className="form-control"
                      maxLength="100"
                      value={section.videoDescription || ""}
                      onChange={(evt) =>
                        updateSection("videoDescription", evt.target.value, idx)
                      }
                    />
                  </div>
                </div>

                <hr />
              </Fragment>
            ))}
            <div className="new-section ml-auto" onClick={addSection}>
              <i className="far fa-plus-square"></i>Add New Section
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onFormSubmit}
            disabled={isLoading || isSubmitDisabled()}
          >
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default CreatePostModal;
