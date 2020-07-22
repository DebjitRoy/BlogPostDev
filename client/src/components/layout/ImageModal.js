import React from "react";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";

const ImageModal = (props) => (
  <Modal {...props} show={props.show} centered size="lg">
    <ModalBody className="image-modal" onClick={props.onHide}>
      {props.image ? (
        <Image
          src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${props.image}`}
          fluid
        />
      ) : null}
      {props.video ? (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={`https://www.youtube.com/embed/${props.video}?autoplay=1`}
          ></iframe>
        </div>
      ) : null}
    </ModalBody>
  </Modal>
);

export default ImageModal;
