import axios from "../untils/axiosCustom";

const getPageTotalReviewAdmin = (target, roomId) => {
  return axios.get(`Review/getPageTotalReview${target}Admin/${roomId}`);
};
const getListReviewPagingAdmin = (target, roomId, page) => {
  return axios.get(
    `Review/getListReview${target}PagingAdmin/${roomId}/page-${page}`
  );
};
const setShowReivew = (target, idReview, isShow) => {
  return axios.post(`Review/setShowReivew${target}`, { idReview, isShow });
};

const deleteReview = (id) => {
  return axios.delete(`Review/deleteReview/${id}`);
};

const getInfor = (target, id) => {
  return axios.get(`${target}/get${target}ById/${id}`);
};

export {
  setShowReivew,
  getPageTotalReviewAdmin,
  getListReviewPagingAdmin,
  deleteReview,
  getInfor,
};
