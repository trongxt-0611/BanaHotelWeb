import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./ManageHotelRooms.scss";
import _ from "lodash";
import { getAllImageDetailByRoom } from "../../../../services/apiServiceAdminRoom";

export const ModalViewRoom = (props) => {
  const { show, setShow, dataRoomUpdate, setDataRoomUpdate } = props;
  const [dataRoomDetailImages, setDataRoomDetailImages] = useState("");
  const handleClose = () => {
    setShow(false);
    setRoomName("");
    setDescripition("");
    setPreviewImage("");
    setDataRoomUpdate({});
    setDataRoomDetailImages("");
  };

  const [roomName, setRoomName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [price, setPrice] = useState("");
  const [star, setStar] = useState(0);
  const [description, setDescripition] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const fetchAllDetailImages = async (id) => {
    try {
      let res = await getAllImageDetailByRoom(id);
      setDataRoomDetailImages(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (!_.isEmpty(dataRoomUpdate)) {
      setRoomName(dataRoomUpdate.nameRoom);
      setHotelName(dataRoomUpdate.nameHotel);
      setDescripition(dataRoomUpdate.description);
      setStar(dataRoomUpdate.star);
      setPrice(dataRoomUpdate.price)


      setPreviewImage(dataRoomUpdate.imageRoom);
      fetchAllDetailImages(dataRoomUpdate.idRoom);
    }
  }, [dataRoomUpdate]);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add New Room
      </Button> */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-add-hotel"
      >
        <Modal.Header closeButton>
          <Modal.Title>Room details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-2" style={{ paddingTop: "5px" }}>
            <div className="col-md-12">
              <label className="form-label">Room Name</label>
              <input
                disabled
                className="form-control"
                value={roomName}

              />
            </div>
            <div className="col-12">
              <label className="form-label">Descriptions</label>
              <textarea
                disabled
                rows="3"
                className="form-control"
                value={description}

              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Price</label>
              <input
                disabled
                className="form-control"
                value={price}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Star</label>
              <input
                disabled
                className="form-control"
                value={star}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Hotel Name</label>
              <input
                disabled
                className="form-control"
                value={hotelName}
              />
            </div>
            <label className="form-label">Hotel image</label>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="img" />
              ) : (
                <span>No image added</span>
              )}
            </div>
            <label className="form-label">Hotel Detail Images</label>

            <div className="row">
              <div className="col-md-12 img-preview">
                {!_.isEmpty(dataRoomDetailImages) ? (
                  dataRoomDetailImages.map((img, index) => {
                    return <img src={img.image} alt="img" key={index} />;
                  })
                ) : (
                  <span>No images added</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
