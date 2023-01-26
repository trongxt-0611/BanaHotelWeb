import axios from "../untils/axiosCustom";

const getAllCategories = () => {
  return axios.get(`Category/getAllCategories`);
};

const postCreateHotel = (data) =>{
  return axios.post(`Hotel/createHotel`,data);
}

const getAllHotels = (page) => {
  return axios.get(`Hotel/getAllHotels/page-${page}`);
}

const getTotalPageHotel = () => {
  return axios.get(`Hotel/getTotalPageHotel`);
};
export { getAllCategories, postCreateHotel, getAllHotels, getTotalPageHotel };
