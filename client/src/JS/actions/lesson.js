import axios from 'axios'

import {
    GET_COURSES_LOAD, GET_COURSES_SUCCESS, GET_COURSES_FAIL,
    GET_COURSE,
    TOGGLE_EDIT,
    TOGGLE_ADD
} from '../actionTypes/lesson'


// get course
export  const getAllCourses = () => async (dispatch) => {
    dispatch({ type: GET_COURSES_LOAD })
    try {
        const result = await axios.get("/api/lesson/coursesList/")
        console.log(2)
        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: result.data
        })
    } catch (error) {
        dispatch({
            type: GET_COURSES_FAIL,
            payload: error.response
        })
    }
}

// get one course by id
export const getCourse = (courseId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/lesson/coursesList/${courseId}`)
        dispatch({ type: GET_COURSE, payload: res.data })
    } catch (error) {
        dispatch({type:GET_COURSES_FAIL,payload:error.response.data})
    }}

// delete course
export const deleteCourse = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/lesson/coursesList/${id}`)
        dispatch(getAllCourses())
    } catch (error) {
        dispatch({type:GET_COURSES_FAIL,payload:error.response.data})
    }
}


// add new course
export const postCourse = (newCourse) => async (dispatch) => {
    try {
        await axios.post("/api/lesson/coursesList/", newCourse)
        dispatch(getAllCourses())
    } catch (error) {
        dispatch({type:GET_COURSES_FAIL,payload:error.response.data})
    }
}

// edit a course
export const editCourse = (courseId, newCourse) => async (dispatch) => {
    try {
        await axios.put(`/api/lesson/coursesList/${courseId}`, newCourse)
        dispatch(getAllCourses())
    } catch (error) {
        dispatch({type:GET_COURSES_FAIL,payload:error.response.data})
    }
}
export const toggleEdit = () => {
    return {
      type: TOGGLE_EDIT,
    };
  };
  export const toggleAdd = () => {
    return {
      type: TOGGLE_ADD,
    };
  };
