import { combineReducers } from "redux";
import studentReducer from "./student";
import professorReducer from './professor'
import courseReducer from './lesson'
const rootReducer = combineReducers({ studentReducer, professorReducer , courseReducer });
export default rootReducer;