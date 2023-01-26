import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./ManageHotelRooms.scss";
import _ from "lodash";
import {
  deleteDetailImagesByRoomId,
  getAllImageDetailByRoom,
  postCreateImageDetailRoom,
  putEditRoom,
} from "../../../../services/apiServiceAdminRoom";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { ValidateInput } from "../components/ValidateInput";

export const ModalUpdateRoom = (props) => {
  const {
    show,
    setShow,
    dataRoomUpdate,
    setDataRoomUpdate,
    fetchRooms,
    currentPage,
  } = props;

  const handleClose = () => {
    setShow(false);
    setRoomName("");
    setDescripition("");
    setPreviewImage("");
    setDataRoomUpdate({});
    setImage(null);
    setPreviewImage("");
    setPreviewDetailImages([]);
    setDetailImages([]);
  };

  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState("");
  const [star, setStar] = useState(0);
  const [description, setDescripition] = useState("");
  const [image, setImage] = useState(null);
  const [detailImages, setDetailImages] = useState([]);
  const [previewDetailImages, setPreviewDetailImages] = useState([]);

  const [previewImage, setPreviewImage] = useState("");
  const [valid, setValid] = useState(false);

  const fetchAllDetailImages = async (id) => {
    try {
      let res = await getAllImageDetailByRoom(id);
      let images = [...res.data].map((img) => {
        return img.image;
      });
      let loadImages = [];
      [...res.data].map(async (img) => {
        await fetch(img.image)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new File([blob], `${"image" + Date.now()}`, {
                type: blob.type,
              })
          )
          .then((file) => {
            loadImages.push(file);
          });
      });
      setPreviewDetailImages(images);
    } catch (error) {}
  };

  useEffect(() => {
    if (!_.isEmpty(dataRoomUpdate)) {
      setRoomName(dataRoomUpdate.nameRoom);
      setDescripition(dataRoomUpdate.description);
      setStar(dataRoomUpdate.star);
      setPrice(dataRoomUpdate.price);

      setPreviewImage(dataRoomUpdate.imageRoom);
      fetchAllDetailImages(dataRoomUpdate.idRoom);
    }
  }, [dataRoomUpdate]);

  const handleUploadFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      // console.log(event.target.files[0]);
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
  const usePrevious = (value) => {
    const ref = useRef([]);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevDetailImages = usePrevious(detailImages);

  const handleSumbitUpdateRoom = async () => {
    //validate

    const form = new FormData();
    form.append("NameRoom", roomName);
    form.append("Price", price);

    if (_.isNull(image)) {
      if (dataRoomUpdate.imageRoom) {
        await fetch(dataRoomUpdate.imageRoom)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new File([blob], `${"image" + Date.now()}`, {
                type: blob.type,
              })
          )
          .then((file) => {
            if (file.size !== 0) {
              form.append("ImageRoom", file);
            }
          });
      }
    } else {
      form.append("ImageRoom", image);
    }

    form.append("Description", description);
    form.append("HotelId", dataRoomUpdate.hotelId);
    try {
      if (detailImages !== prevDetailImages) {
        try {
          await deleteDetailImagesByRoomId(dataRoomUpdate.idRoom);
        } catch (error) {}
      }
      for (let i = 0; i < detailImages.length; i++) {
        const data = new FormData();
        data.append("roomId", dataRoomUpdate.idRoom);
        const detailImg = detailImages[i];
        data.append("Image", detailImg);
        try {
          await postCreateImageDetailRoom(data);
        } catch (error) {}
      }

      await putEditRoom(dataRoomUpdate.idRoom, form);
      toast.success("Updated successful");
      await fetchRooms(currentPage);
      handleClose();
      // console.log("data: >>>>>>>", res);
    } catch (error) {
      toast.error("Update room failed");
      // console.log(">>>>>>>> error put", error);
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
      console.log("f", price, isNaN(Number(price)));
    } else {
      setValid(true);
      console.log("t");
    }
  }, [roomName, price]);
  return (
    <>
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
              <ValidateInput
                min={10}
                // max={11}
                name={"Room number"}
                type={"text"}
                required={true}
                setValid={setValid}
                value={roomName}
                onChange={(event) => {
                  setRoomName(event.target.value);
                }}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Descriptions</label>
              <textarea
                rows="3"
                className="form-control"
                value={description}
                onChange={(event) => {
                  setDescripition(event.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price</label>
              <ValidateInput
                max={10}
                name={"Price"}
                type={"number"}
                required={true}
                setValid={setValid}
                value={"" + price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Star</label>
              <input className="form-control" value={star} disabled />
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
                <span>No image added</span>
              )}
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
                <span>No images added</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSumbitUpdateRoom}
            disabled={!valid ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
