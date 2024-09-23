import { combineReducers } from "@reduxjs/toolkit";
import  userSlice    from './slice'

const rootReducer = combineReducers({
    user : userSlice
})

export default rootReducer