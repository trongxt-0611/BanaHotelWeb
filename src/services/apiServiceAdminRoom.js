import axios from "../untils/axiosCustom";

const getAllRooms = (page) => {
  return axios.get(`Room/getAllRooms/page-${page}`);
};
const getTotalPageRoom = () => {
  return axios.get(`Room/getTotalPageRoom`);
};

const getSearchRoomPaging = (page, keyword) => {
  return axios.get(`Room/searchRoomPaging/page-${page}?keyword=${keyword}`);
};

const getTotalPageSearchRoom = (keyword) => {
  return axios.get(`Room/getTotalPageSearchRoom?keyword=${keyword}`);
};

const getListRoomsByIdHotel = (hotelId, page) => {
  return axios.get(`Hotel/getListRoomsByIdHotel/${hotelId}/page-${page}`);
};
const getTotalPageListRoomsByIdHotel = (hotelId) => {
  return axios.get(`Hotel/getTotalPageListRoomsByIdHotel/${hotelId}`);
};

const getAllImageDetailByRoom = (id) => {
  return axios.get(`ImageDetail/getAllImageDetailByRoom/${id}`);
};
const postCreateRoom = (data) => {
  return axios.post(`/Room/createRoom`, data);
};
const postCreateImageDetailRoom = (data) => {
  return axios.post(`ImageDetail/createImageDetailRoom`, data);
};
const deleteRoom = (id) => {
  return axios.delete(`Room/deleteRoom/${id}`);
};

const deleteDetailImagesByRoomId = (id) => {
  return axios.delete(`ImageDetail/deleteImageDetailByRoom/${id}`);
};

const putEditRoom = (id, data) => {
  return axios.put(`Room/editRoom/${id}`, data);
};

export {
  getAllRooms,
  getTotalPageRoom,
  getSearchRoomPaging,
  getTotalPageSearchRoom,
  getListRoomsByIdHotel,
  getTotalPageListRoomsByIdHotel,
  postCreateRoom,
  postCreateImageDetailRoom,
  getAllImageDetailByRoom,
  putEditRoom,
  deleteRoom,
  deleteDetailImagesByRoomId,
};
