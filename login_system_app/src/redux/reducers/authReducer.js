import * as actionTypes from "../actions/actionType";

const initialState = {
  userData: null,
  loginLoading: false,
  registerLoading: false,
};
const store = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_INIT:
      return {
        ...state,
        error: "",
        message: "",
        loginLoading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        message: action.payload?.message,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        error: action.payload,
      };
    case actionTypes.REGISTER_INIT:
      return {
        ...state,
        error: "",
        registerLoading: true,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        userData: action.payload,
      };
    case actionTypes.REGISTER_FAILED:
      return {
        ...state,
        registerLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default store;
