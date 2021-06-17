import {
    CURRENT_USER,
    FAIL_USER,
    LOAD_USER,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
  } from "../actionTypes/student";
  
  const initialState = {
    student: null,
    isAuthStudent: false,
    loadUser: false,
    errors: [],
  };
  
  const studentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOAD_USER:
        return { ...state, loadUser: true };
      case REGISTER_USER:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          loadUser: false,
          student: payload.student,
          isAuthStudent: true,
          errors: [],
        };
      case LOGIN_USER:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          loadUser: false,
          student: payload.student,
          isAuthStudent: true,
          errors: [],
        };
      case CURRENT_USER:
        return {
          ...state,
          loadUser: false,
          student: payload,
          isAuthStudent: true,
          errors: [],
        };
      case FAIL_USER:
        return { ...state, loadUser: false, errors: payload };
      case LOGOUT_USER:
        localStorage.removeItem("token");
        return {
          ...state,
          loadUser: false,
          errors: [],
          student: {},
          isAuthStudent: false,
        };
      case "VIDE_ERRORS":
        return { ...state, errors: [] };
      default:
        return state;
    }
  };
  export default studentReducer;