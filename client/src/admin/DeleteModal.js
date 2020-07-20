import React, { useState } from "react";
// import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const typeMapper = {
  content: "Section",
  sectionImage: "Section Image",
  post: "Post",
  comment: "Comment",
};
const DeleteModal = ({
  isOpen,
  closeModal,
  onPostDelete,
  postTitle,
  deleteType,
}) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <Modal show={isOpen}>
      <ModalHeader className="bg-primary text-white">
        <ModalTitle>Delete</ModalTitle>
        <button className="close" onClick={closeModal}>
          <span>&times;</span>
        </button>
      </ModalHeader>
      <ModalBody>
        <h5>Do You Want To Delete this {typeMapper[deleteType] || "Post"}?</h5>
        <h3 className="display-5">{postTitle}</h3>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={onPostDelete}>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <span>DELETE</span>
          )}
        </button>
        <button className="btn btn-secondary" onClick={closeModal}>
          CANCEL
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
