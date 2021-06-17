import {
    GET_COURSES_LOAD, GET_COURSES_SUCCESS, GET_COURSES_FAIL,
    GET_COURSE,
    TOGGLE_EDIT,
    TOGGLE_ADD
} from '../actionTypes/lesson'

const initState = {
    courseList: [],
    loadCourses: false,
    errors: [],
    edit: false,
    course: {}
}

const courseReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case GET_COURSES_LOAD: return {
            ...state,
            loadCourses: true
        }
        case GET_COURSES_SUCCESS: return {
            ...state,
            courseList: payload,
            loadCourses: false
        }
        case GET_COURSES_FAIL: return {
            ...state,
            errors: payload,
            loadCourses: false
        }
        case TOGGLE_EDIT: return {
            ...state,
            edit: true
        }
        case TOGGLE_ADD: return {
            ...state,
            edit: false
        }
        case GET_COURSE: return {
            ...state,
            course: payload.response
        }

        default: return state
    }

}

export default courseReducer