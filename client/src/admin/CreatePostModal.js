import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const CreatePostModal = () => {
  const postCategories = ["travel", "books", "miscl"];
  const postType = {
    travel: "Travel",
    books: "Books",
    miscl: "Miscl",
  };
  const [formState, onUpdateForm] = useState({
    title: "",
    category: "travel",
    coverImage: null,
    sections: [
      {
        header: null,
        body: null,
      },
    ],
  });
  const updateForm = (key, val) => {
    onUpdateForm({
      ...formState,
      [key]: val,
    });
  };

  const updateSection = (key, val, idx) => {
    const sections = [...formState.sections];
    sections[idx][key] = val;
    onUpdateForm({
      ...formState,
      sections,
    });
  };
  //   const handleFileSelect = (evt) => {
  //     changeImgState(evt.target.files[0]);
  //   };

  //   const uploadImage = async () => {
  //     const fd = new FormData();
  //     fd.append("file", imgState, imgState.name);
  //     const resphoto = await axios.put(
  //       "/api/posts/5ee5ca64f65af4bf397051fa/upload",
  //       fd
  //     );
  //     console.log(resphoto);
  //   };

  //   const [sectionsState, changeSectionState] = useState([
  //     {
  //       header: null,
  //       body: null,
  //       //   image: null,
  //     },
  //   ]);
  const addSection = () => {
    const blankSection = {
      header: null,
      body: null,
    };
    // changeSectionState([...sectionsState, blankSection]);
    onUpdateForm({
      ...formState,
      sections: [...formState.sections, blankSection],
    });
  };
  const deleteSection = (idx) => {
    const sections = [...formState.sections];

    sections.splice(idx, 1);
    onUpdateForm({
      ...formState,
      sections: sections,
    });
    // changeSectionState([...sectionsState]);
  };

  const isSubmitDisabled = () =>
    formState.title.length < 3 ||
    formState.category < 3 ||
    (formState.sections[0].body && formState.sections[0].body.length < 5);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(formState);
  };

  return (
    <Fragment>
      <div className="modal fade" id="addPostModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Post</h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                    value={formState.category}
                    required
                    onChange={(evt) => updateForm("category", evt.target.value)}
                  >
                    {postCategories.map((category, idx) => (
                      <option value={category} key={idx}>
                        {postType[category]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Upload Cover Image</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="image"
                      onChange={(evt) =>
                        updateForm("coverImage", evt.target.files[0])
                      }
                    />
                    <label htmlFor="image" className="custom-file-label">
                      {(formState.coverImage && formState.coverImage.name) ||
                        "Choose File"}
                    </label>
                  </div>
                  <small className="form-text text-muted">Max Size 300KB</small>
                </div>
                <hr />
                {formState.sections.map((section, idx) => (
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
                        value={section.body || ""}
                        required
                        onChange={(evt) =>
                          updateSection("body", evt.target.value, idx)
                        }
                      ></textarea>
                    </div>

                    <hr />
                  </Fragment>
                ))}
                <div className="new-section ml-auto" onClick={addSection}>
                  <i className="far fa-plus-square"></i>Add New Section
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                // data-dismiss="modal"
                disabled={isSubmitDisabled()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePostModal;
