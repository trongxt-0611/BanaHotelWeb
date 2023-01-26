export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const LOG_OUT_USER = "LOG_OUT_USER";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => {
  localStorage.clear("persist:root");
  return {
    type: LOG_OUT_USER,
    payload: null,
  };
};

export const updateProfile = (data) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: data,
  };
};
