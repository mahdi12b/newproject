import {
  CURRENT_USER,
  FAIL_USER,
  LOAD_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
} from "../actionTypes/student";

import axios from "axios";

export const register = (newStudent, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  console.log(history);
  try {
    const result = await axios.post("/api/user/student/signup", newStudent);

    dispatch({ type: REGISTER_USER, payload: result.data }); //msg , token , user
    history.push("/student/profile");
  } catch (error) {
    // error.response.data.map((el) => alert(el.msg));
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const login = (student, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });

  try {
    const result = await axios.post("/api/user/student/signin", student);
    dispatch({ type: LOGIN_USER, payload: result.data }); //msg /token , user
    window.localStorage.setItem("userId", result.data.student._id);
    history.push("/student/profile");
  } catch (error) {
    console.log(error.response);
    /* error.response.data.errors.map((el) =>
         setTimeout(function () {
           alert(el.msg);
         }, 3000)
       );*/
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const currentStudent = () => async (dispatch) => {
  try {
    const options = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/user/student/current", options);
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const videErrors = () => {
  return {
    type: "VIDE_ERRORS",
  };
};
