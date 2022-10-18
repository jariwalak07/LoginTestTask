import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_INIT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "./actionType";
import axios from "axios";
export const LoginUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_INIT,
    });
    await axios
      .post(`http://${process.env.REACT_APP_API_URL}auth/login`, data)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        return;
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: error?.response?.data?.error,
        });
        throw error?.response?.data?.error;
      });
  };
};

export const RegisterUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTER_INIT,
    });
    await axios
      .post(`http://${process.env.REACT_APP_API_URL}auth/register`, data)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data?.message?.response,
        });
        return;
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_FAILED,
          payload: error?.response?.data?.message,
        });
        throw error?.response?.data?.error;
      });
  };
};
