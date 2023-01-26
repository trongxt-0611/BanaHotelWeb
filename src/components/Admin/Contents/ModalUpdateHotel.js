import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  deleteDetailImagesByHotelId,
  getAllCategories,
  getAllHotelDetailImages,
  postHotelDetailImage,
  putEditHotel,
} from "../../../services/apiServiceAdminHotel";
import "./ManageHotel.scss";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { ValidateInput } from "./components/ValidateInput";
import { set } from "nprogress";

export const ModalUpdateHotel = (props) => {
  const {
    show,
    setShow,
    dataHotelUpdate,
    setDataHotelUpdate,
    fetchHotels,
    currentPage,
  } = props;

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
    setDataHotelUpdate("");
  };

  const fetchAllDetailImages = async (id) => {
    try {
      let res = await getAllHotelDetailImages(id);
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

  // const isEmpty = (str) => {
  //   return _.isEmpty(str);
  // };
  // useEffect(() => {
  //   if (
  //     isEmpty(hotelName) ||
  //     isEmpty(hotelPhone) ||
  //     isEmpty(hotelAddress) ||
  //     isEmpty(category)
  //   ) {
  //     setValid(false);
  //   } else {
  //     setValid(true);
  //   }
  // }, [valid]);

  const getUpdateCategoryId = (str) => {
    let arr = str.split(" ");
    if (arr.length > 1) {
      return arr[0];
    } else {
      return 6;
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
  const fetchCategories = async () => {
    try {
      let res = await getAllCategories();
      if (res && res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {}
  };
  const handleSumbitUpdateHotel = async () => {
    //validate

    const form = new FormData();
    form.append("NameHotel", hotelName);
    form.append("Address", hotelAddress);
    form.append("PhoneHotel", hotelPhone);

    if (_.isNull(image)) {
      // console.log(">>>>>", !dataHotelUpdate.imageHotel);
      if (dataHotelUpdate.imageHotel) {
        await fetch(dataHotelUpdate.imageHotel)
          .then((response) => response.blob())
          .then(
            (blob) =>
              new File([blob], `${"image" + Date.now()}`, {
                type: blob.type,
              })
          )
          .then((file) => {
            console.log(">>>>>", file.size);
            if (file.size !== 0) {
              form.append("ImageHotel", file);
            }
          });
      }
    } else {
      form.append("ImageHotel", image);
    }

    form.append("Description", description);
    form.append("CategoryId", category);
    try {
      try {
        if (detailImages !== prevDetailImages) {
          await deleteDetailImagesByHotelId(dataHotelUpdate.idHotel);
        }
        for (let i = 0; i < detailImages.length; i++) {
          const data = new FormData();
          data.append("hotelId", dataHotelUpdate.idHotel);
          const detailImg = detailImages[i];
          data.append("image", detailImg);
          try {
            await postHotelDetailImage(data);
          } catch (error) {}
        }
      } catch (error) {}

      await putEditHotel(dataHotelUpdate.idHotel, form);
      toast.success("Updated successful");
      await fetchHotels(currentPage);
      handleClose();
      // console.log("data: >>>>>>>", res);
    } catch (error) {
      toast.error("Update hotel failed");
      // console.log(">>>>>>>> error put", error);
    }
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
          <Modal.Title>Update Hotel</Modal.Title>
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
            onClick={handleSumbitUpdateHotel}
            disabled={!valid ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
