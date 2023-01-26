import axios from "../untils/axiosCustom";

const getAllCategories = () => {
  return axios.get(`Category/getAllCategories`);
};
const getHotelById = (id) => {
  return axios.get(`Hotel/getHotelById/${id}`);
};

const postCreateHotel = (data) => {
  return axios.post(`Hotel/createHotel`, data);
};

const getAllHotels = (page) => {
  return axios.get(`Hotel/getAllHotels/page-${page}`);
};

const getTotalPageHotel = () => {
  return axios.get(`Hotel/getTotalPageHotel`);
};

const putEditHotel = (id, data) => {
  return axios.put(`Hotel/editHotel/${id}`, data);
};

const deleteHotel = (id) => {
  return axios.delete(`Hotel/deleteHotel/${id}`);
};
const deleteDetailImagesByHotelId = (hotelID) => {
  return axios.delete(`ImageDetail/deleteImageDetailByHotel/${hotelID}`);
};

const postHotelDetailImage = (data) => {
  return axios.post(`ImageDetail/createImageDetailHotel`, data);
};
const getAllHotelDetailImages = (id) => {
  return axios.get(`ImageDetail/getImageDetailByHotel/${id}/page-1`);
};

const getSearchHotelPaging = (page, q, cate) => {
  return axios.get(
    `Hotel/searchHotelPaging/page-${page}?keyword=${q}&idCategory=${cate}`
  );
};
const getTotalPageSearchHotel = (q, cate) => {
  return axios.get(
    `Hotel/getTotalPageSearchHotel?keyword=${q}&idCategory=${cate}`
  );
};

export {
  getAllCategories,
  postCreateHotel,
  getAllHotels,
  getTotalPageHotel,
  putEditHotel,
  deleteHotel,
  postHotelDetailImage,
  deleteDetailImagesByHotelId,
  getAllHotelDetailImages,
  getHotelById,
  getSearchHotelPaging,
  getTotalPageSearchHotel,
};
