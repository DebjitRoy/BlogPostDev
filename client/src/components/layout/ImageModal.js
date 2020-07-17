import React from "react";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";

const ImageModal = (props) => (
  <Modal {...props} show={props.show} centered size="lg">
    <ModalBody className="image-modal" onClick={props.onHide}>
      <Image
        src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${props.image}`}
        fluid
      />
    </ModalBody>
  </Modal>
);

export default ImageModal;
