import { combineReducers } from 'redux'

import employeeReview from './employeeReview/reducer';

const rootReducer = combineReducers({
  employeeReview
})

export default rootReducer