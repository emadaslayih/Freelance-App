import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESS,
  EDIT_USER_REQUEST,
  ACCOUNT_DELETED,
} from "./types";
// import { v4 as uuidv4 } from "uuid";

const userLoaded = (payload) => ({
  type: USER_LOADED,
  payload,
});

const authError = () => ({
  type: AUTH_ERROR,
});

const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

const registerFail = () => ({
  type: REGISTER_FAIL,
});

const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

// const setAlert = (payload) => ({
//   type: SET_ALERT,
//   payload,
// });

const loginFail = () => ({
  type: LOGIN_FAIL,
});

const editSuccess = (payload) => ({
  type: EDIT_USER_SUCCESS,
});

const editFail = () => ({
  type: EDIT_USER_FAIL,
});

const editRequest = () => ({
  type: EDIT_USER_REQUEST,
});
const deleteAccount = () => ({
  type: ACCOUNT_DELETED,
});

const logout = () => ({ type: LOGOUT });

// const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
//   const id = uuidv4();
//   dispatch(setAlert({ msg, alertType, id }));

//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };

export {
  logout,
  loginFail,
  loginSuccess,
  registerFail,
  registerSuccess,
  authError,
  userLoaded,
  editFail,
  editSuccess,
  deleteAccount,
  editRequest,
};
