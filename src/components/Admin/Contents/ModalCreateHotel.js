import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getAllCategories,
  postCreateHotel,
  postHotelDetailImage,
} from "../../../services/apiServiceAdminHotel";
import "./ManageHotel.scss";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { ValidateInput } from "./components/ValidateInput";

export const ModalCreateHotel = (props) => {
  const { show, setShow, fetchHotels, currentPage } = props;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelAddress, setHotelAdress] = useState("");
  const [hotelPhone, setHotelPhone] = useState("");
  const [description, setDescripition] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [detailImages, setDetailImages] = useState([]);
  const [previewDetailImages, setPreviewDetailImages] = useState([]);
  const [valid, setValid] = useState(false);

  const handleClose = () => {
    setShow(false);
    setHotelAdress("");
    setHotelName("");
    setHotelPhone("");
    setDescripition("");
    setCategory("");
    setImage(null);
    setPreviewImage("");
    setPreviewDetailImages([]);
    setDetailImages([]);
    setPreviewDetailImages([]);
    fetchHotels(currentPage);
  };
  useEffect(() => {
    if (
      _.isEmpty(hotelName) ||
      _.isEmpty(hotelAddress) ||
      _.isEmpty(hotelPhone) ||
      _.isEmpty(category) ||
      !String(hotelPhone).match(/^[0-9]+$/) ||
      hotelName.length < 5 ||
      hotelAddress.length < 5 ||
      hotelPhone.length < 10 ||
      hotelPhone.length > 11
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [hotelAddress, hotelName, hotelPhone, category]);

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
  const fetchCategories = async () => {
    try {
      let res = await getAllCategories();
      if (res && res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleSumbitAddHotel = async () => {
    //validate
    const form = new FormData();
    form.append("nameHotel", hotelName);
    form.append("address", hotelAddress);
    form.append("phoneHotel", hotelPhone);
    form.append("imageHotel", image);
    form.append("description", description);
    form.append("categoryId", category);
    try {
      let res = await postCreateHotel(form);
      if (!_.isEmpty(detailImages)) {
        let hotelId = res.data.idHotel;
        // console.log(">>>>>>>>>idHotel", hotelId);
        for (let i = 0; i < detailImages.length; i++) {
          const data = new FormData();
          data.append("hotelId", hotelId);
          const detailImg = detailImages[i];
          data.append("image", detailImg);
          try {
            await postHotelDetailImage(data);
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
          <Modal.Title>Create New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-2" style={{ paddingTop: "5px" }}>
            <div className="col-md-12">
              <label className="form-label">Hotel Name</label>
              <ValidateInput
                min={5}
                // max={10}
                name={"Hotel name"}
                type={"text"}
                required={true}
                setValid={setValid}
                value={hotelName}
                onChange={(event) => setHotelName(event.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <ValidateInput
                min={5}
                // max={10}
                name={"Adress"}
                type={"text"}
                required={true}
                setValid={setValid}
                value={hotelAddress}
                onChange={(event) => setHotelAdress(event.target.value)}
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
              <label className="form-label">Phone Number</label>
              <ValidateInput
                min={10}
                max={11}
                name={"Phone number"}
                type={"number"}
                required={true}
                setValid={setValid}
                value={hotelPhone}
                onChange={(event) => setHotelPhone(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className={
                  _.isEmpty(category)
                    ? "form-select  is-invalid"
                    : "form-select  is-valid"
                }
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                <option value="" disabled>
                  Select your hotel level
                </option>
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
