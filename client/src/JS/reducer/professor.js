import {
    LOAD_USER_PROFESSOR,
    REGISTER_USER_PROFESSOR,
    LOGIN_USER_PROFESSOR,
    CURRENT_USER_PROFESSOR,
    FAIL_USER_PROFESSOR,
    LOGOUT_USER_PROFESSOR,
  } from "../actionTypes/professor";
  
  const initialState = {
    professor: null,
    isAuthProfessor: false,
    loadUser: false,
    errors: [],
  };
  
  const professorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOAD_USER_PROFESSOR:
        return { ...state, loadUser: true };
      case REGISTER_USER_PROFESSOR:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          loadUser: false,
          professor: payload.professor,
          isAuthProfessor: true,
          errors: [],
        };
      case LOGIN_USER_PROFESSOR:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          loadUser: false,
          professor: payload.professor,
          isAuthProfessor: true,
          errors: [],
        };
      case CURRENT_USER_PROFESSOR:
        return {
          ...state,
          loadUser: false,
          professor: payload,
          isAuthProfessor: true,
          errors: [],
        };
      case FAIL_USER_PROFESSOR:
        return { ...state, loadUser: false, errors: payload };
      case LOGOUT_USER_PROFESSOR:
        localStorage.removeItem("token");
        return {
          ...state,
          loadUser: false,
          errors: [],
          professor: {},
          isAuthProfessor: false,
        };
      case "VIDE_ERRORS":
        return { ...state, errors: [] };
      default:
        return state;
    }
  };
  export default professorReducer;