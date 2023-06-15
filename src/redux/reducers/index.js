import { combineReducers } from "redux"
import personal from './personal'
import data from './data'

const rootReducer = combineReducers({ personal, data });

export default rootReducer;