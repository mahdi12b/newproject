import {
  CURRENT_USER_PROFESSOR,
  FAIL_USER_PROFESSOR,
  LOGIN_USER_PROFESSOR,
  REGISTER_USER_PROFESSOR,
  LOGOUT_USER_PROFESSOR,
  LOAD_USER_PROFESSOR,
} from "../actionTypes/professor";

import axios from "axios";

export const register = (newProfessor, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER_PROFESSOR });
  console.log(history);
  try {
    const result = await axios.post("/api/user/professor/signup", newProfessor);
    dispatch({ type: REGISTER_USER_PROFESSOR, payload: result.data }); //msg , token , user

    history.push(`/professor/profile/`);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    // error.response.data.errors.map((el) => alert(el.msg));
    dispatch({
      type: FAIL_USER_PROFESSOR,
      payload: error.response.data.errors,
    });
  }
};

export const login = (professor, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER_PROFESSOR });

  try {
    const result = await axios.post("/api/user/professor/signin", professor);
    dispatch({ type: LOGIN_USER_PROFESSOR, payload: result.data }); //msg /token , user
    window.localStorage.setItem("userId", result.data.professor._id);
    history.push("/professor/profile");
  } catch (error) {
    console.log(error);
    // error.response.data.errors.map((el) =>
    //   setTimeout(function () {
    //     alert(el.msg);
    //   }, 3000)
    // );
    dispatch({
      type: FAIL_USER_PROFESSOR,
      payload: error.response.data.errors,
    });
  }
};

export const currentProfessor = () => async (dispatch) => {
  try {
    const options = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const result = await axios.get("/api/user/professor/current", options);
    console.log(result);
    dispatch({ type: CURRENT_USER_PROFESSOR, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER_PROFESSOR, payload: error.response.data });
  }
};

export const logoutProf = () => {
  return {
    type: LOGOUT_USER_PROFESSOR,
  };
};

export const videErrors = () => {
  return {
    type: "VIDE_ERRORS",
  };
};
