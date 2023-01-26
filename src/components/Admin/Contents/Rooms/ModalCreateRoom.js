import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { useParams } from "react-router-dom";
import {
  postCreateImageDetailRoom,
  postCreateRoom,
} from "../../../../services/apiServiceAdminRoom";
import { ValidateInput } from "../components/ValidateInput";

export const ModalCreateRoom = (props) => {
  const { show, setShow, fetchRooms, currentPage, hotelId } = props;
  const [price, setPrice] = useState("");
  const [roomName, setRoomName] = useState("");
  const [description, setDescripition] = useState("");
  const [image, setImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");
  const [detailImages, setDetailImages] = useState([]);
  const [previewDetailImages, setPreviewDetailImages] = useState([]);
  const [valid, setValid] = useState(false);

  const handleClose = () => {
    setShow(false);
    setRoomName("");
    setDescripition("");
    setImage(null);
    setPrice("");
    setPreviewImage("");
    setPreviewDetailImages([]);
    setDetailImages([]);
    setPreviewDetailImages([]);
    fetchRooms(currentPage);
  };

  const handleUploadFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handleUploadMultipleFile = (event) => {
    if (event.target && event.target.files) {
      let files = [...event.target.files];
      setDetailImages(files.slice(0, 5));

      const previewImages = files.slice(0, 5).map((file) => {
        return URL.createObjectURL(file);
      });
      setPreviewDetailImages(previewImages);
      // console.log(">>>>>>>>>>>>", previewImages.length);
    }
  };
  const handleSumbitAddHotel = async () => {
    //validate
    const form = new FormData();
    form.append("nameRoom", roomName);
    form.append("imageRoom", image);
    form.append("description", description);
    form.append("price", price);
    form.append("hotelId", hotelId);
    try {
      let res = await postCreateRoom(form);
      if (!_.isEmpty(detailImages)) {
        let roomId = res.data.idRoom;
        // console.log(">>>>>>>>>idHotel", roomId);
        for (let i = 0; i < detailImages.length; i++) {
          const data = new FormData();
          data.append("roomId", roomId);
          const detailImg = detailImages[i];
          data.append("Image", detailImg);
          try {
            await postCreateImageDetailRoom(data);
          } catch (error) {}
        }
      }
      if (res.status === 200) {
        toast.success("New hotel added successful");
        handleClose();
      }
      // console.log("res: >>>>>>>", res);
    } catch (error) {
      toast.error("Add new hotel failed");
      // console.log("ERROR: >>>>>>>", error);
    }
  };

  useEffect(() => {
    if (
      _.isEmpty(roomName) ||
      _.isEmpty(price) ||
      isNaN(price) ||
      price.length > 10 ||
      roomName.length < 5
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [roomName, price]);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add New Hotel
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        className="modal-add-hotel"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-2" style={{ paddingTop: "5px" }}>
            <div className="col-md-12">
              <label className="form-label">Room Name</label>
              <ValidateInput
                min={5}
                // max={11}
                name={"Room name"}
                type={"text"}
                required={true}
                setValid={setValid}
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Descriptions</label>
              <textarea
                rows="3"
                className="form-control"
                value={description}
                onChange={(event) => setDescripition(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price (*VND per hour)</label>
              <ValidateInput
                max={10}
                name={"Price"}
                type={"number"}
                required={true}
                setValid={setValid}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload image file
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadFile(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="img" />
              ) : (
                <span>Image preview</span>
              )}
              {/* <span>Image preview</span> */}
            </div>

            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="imgDetail">
                <FcPlus />
                Upload detail images (*multiple files)
              </label>
              <input
                type="file"
                hidden
                id="imgDetail"
                multiple
                onChange={(event) => handleUploadMultipleFile(event)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {!_.isEmpty(previewDetailImages) ? (
                previewDetailImages.map((img, index) => {
                  return <img src={img} alt="img" key={index} />;
                })
              ) : (
                <span>Image preview</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSumbitAddHotel}
            disabled={!valid ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
