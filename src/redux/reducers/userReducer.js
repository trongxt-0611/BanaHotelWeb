import { Admin } from "../../components/Admin/Admin";
import {
  FETCH_USER_LOGIN_SUCCESS,
  LOG_OUT_USER,
  UPDATE_USER_PROFILE,
} from "../actions/userActions";

const INITIAL_STATE = {
  account: {
    email: null,
    username: null,

    name: null,
    avatar: null,
    address: null,
    phone: null,

    isAdmin: false,
  },
  isAuthenticated: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        account: {
          isAdmin: action.payload.isAdmin,
          email: action.payload.email,
          username: action.payload.username,
          address: action.payload.address,
          avatar: action.payload.avatar,
          phone: action.payload.phone,
          name: action.payload.name,
        },
      };
    case LOG_OUT_USER:
      return {
        ...state,
        account: {
          email: null,
          username: null,
          avatar: null,

          address: null,
          phone: null,
          name: null,
          isAdmin: false,
        },
        isAuthenticated: false,
      };

    case UPDATE_USER_PROFILE:
      return {
        ...state,
        account: {
          ...state.account,
          username: action.payload.username,
          avatar: action.payload.avatar,
          address: action.payload.address,
          phone: action.payload.phone,
          name: action.payload.name,
        },
      };
    default:
      return state;
  }
};
