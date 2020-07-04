import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
const CreatePostForm = () => {
  const [imgState, changeImgState] = useState(null);
  const handleFileSelect = (evt) => {
    changeImgState(evt.target.files[0]);
  };

  const uploadImage = async () => {
    const fd = new FormData();
    fd.append("file", imgState, imgState.name);
    const resphoto = await axios.put(
      "/api/posts/5ee5ca64f65af4bf397051fa/upload",
      fd
    );
    console.log(resphoto);
  };

  return (
    <Fragment>
      <section className="post-detail">
        <div className="container">
          <form>
            <p>Upload an image</p>
            <input type="file" onChange={handleFileSelect} />
            <button type="button" onClick={uploadImage}>
              Upload
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default CreatePostForm;
