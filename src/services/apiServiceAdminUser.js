import axios from "../untils/axiosCustom";

const getAllUsers = (page) => {
  return axios.get(`User/getAllUserPaging/page-${page}`);
};
const getTotalPageAllUser = () => {
  return axios.get(`User/getTotalPageAllUser`);
};

const getSearchUserPaging = (page, keyword) => {
  return axios.get(`User/searchUserPaging/page-${page}?keyword=${keyword}`);
};

const getTotalPageSearchUser = (keyword) => {
  return axios.get(`User/getTotalPageUser?keyword=${keyword}`);
};

const deleteUser = (id) => {
  return axios.delete(`User/deleteUser/${id}`);
};
export {
  getAllUsers,
  getTotalPageAllUser,
  getSearchUserPaging,
  getTotalPageSearchUser,
  deleteUser,
};
