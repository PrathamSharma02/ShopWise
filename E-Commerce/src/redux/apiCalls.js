import { publicRequest } from "../requestMethods.js";
import { loginFailure, loginStart, loginSuccess,logout, registerFailure, registerStart, registerSuccess } from "./userRedux.js"

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data)); // Dispatch the registerSuccess action with the response data
    return res.data; // Return the response data
  } catch (er) {
    dispatch(registerFailure());
    throw er;
  }
};


// export const register = async (dispatch, user) => {
//   dispatch(registerStart());
//   try {
//     const res = await publicRequest.post("/auth/register", user);
//     dispatch(registerSuccess(res.data));
//   } catch (er) {
//     dispatch(registerFailure());
//   }
// };

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
