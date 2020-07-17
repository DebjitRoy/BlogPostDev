import React, { useState } from "react";
import Image from "react-bootstrap/Image";
// import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";

const ImageModal = ({ isOpen, onHide, image }) => (
  <Modal show={isOpen} centered size="lg">
    <ModalBody onClick={onHide}>
      <Image
        src={`https://bengali-blog-static-uploads.s3.amazonaws.com/${image}`}
        fluid
      />
    </ModalBody>
  </Modal>
);

export default ImageModal;
