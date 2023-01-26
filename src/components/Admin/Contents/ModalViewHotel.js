import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getAllCategories,
  getAllHotelDetailImages,
} from "../../../services/apiServiceAdminHotel";
import "./ManageHotel.scss";
import _ from "lodash";

export const ModalViewHotel = (props) => {
  const { show, setShow, dataHotelUpdate, setDataHotelUpdate } = props;
  const [dataHotelDetailImages, setDataHotelDetailImages] = useState("");
  const handleClose = () => {
    setShow(false);
    setHotelAdress("");
    setHotelName("");
    setHotelPhone("");
    setDescripition("");
    setCategory("");
    setPreviewImage("");
    setDataHotelUpdate({});
    setDataHotelDetailImages("");
  };

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAdress] = useState("");
  const [hotelPhone, setHotelPhone] = useState("");
  const [description, setDescripition] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const fetchAllDetailImages = async (id) => {
    try {
      let res = await getAllHotelDetailImages(id);
      setDataHotelDetailImages(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dataHotelUpdate)) {
      setHotelAdress(dataHotelUpdate.address);
      setHotelName(dataHotelUpdate.nameHotel);
      setHotelPhone(dataHotelUpdate.phoneHotel);
      setDescripition(dataHotelUpdate.description);

      let cateName = dataHotelUpdate.nameCategory;
      setCategory(getUpdateCategoryId(cateName));

      setPreviewImage(dataHotelUpdate.imageHotel);

      fetchAllDetailImages(dataHotelUpdate.idHotel);
    }
  }, [dataHotelUpdate]);

  const getUpdateCategoryId = (str) => {
    let arr = str.split(" ");
    if (arr.length > 1) {
      return arr[0];
    } else {
      return 6;
    }
  };

  const fetchCategories = async () => {
    try {
      let res = await getAllCategories();
      if (res && res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {}
  };
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
          <Modal.Title>Hotel details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-2" style={{ paddingTop: "5px" }}>
            <div className="col-md-12">
              <label className="form-label">Hotel Name</label>
              <input
                disabled
                className="form-control"
                value={hotelName}
                onChange={(event) => setHotelName(event.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                disabled
                className="form-control"
                value={hotelAddress}
                onChange={(event) => setHotelAdress(event.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Descriptions</label>
              <textarea
                disabled
                rows="3"
                className="form-control"
                value={description}
                onChange={(event) => setDescripition(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                disabled
                className="form-control"
                value={hotelPhone}
                onChange={(event) => setHotelPhone(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                disabled
                className="form-select"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <option
                        value={item["idCategory"]}
                        key={item["idCategory"]}
                      >
                        {item["nameCategory"]}
                      </option>
                    );
                  })}
              </select>
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
                {!_.isEmpty(dataHotelDetailImages) ? (
                  dataHotelDetailImages.map((img, index) => {
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
