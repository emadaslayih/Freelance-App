import api from "../utils/api";
import {
  userLoaded,
  authError,
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  deleteAccount,
  editFail,
  editSuccess,
  editRequest,
} from "./actions";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/single");
    console.log(res);
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

// Register User
export const registerUser = (formData) => async (dispatch) => {
  console.log("my form data:", formData);
  try {
    const res = await api.post("/signup", formData);
    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log("error", errors);
    }
    dispatch(registerFail());
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post("/login", body);
    console.log("LOGIN SUCCESS");

    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log("error", errors);
    }

    dispatch(loginFail());
  }
};

export const updateUser = (userID, formData) => async (dispatch) => {
  dispatch(editRequest());
  try {
    api.patch(`/${userID}`, formData);
    console.log("UPDATE SUCCESSS------------------------------------");
    dispatch(editSuccess(formData));
    dispatch(loadUser);
  } catch (err) {
    dispatch(editFail());
  }
};

// Logout
