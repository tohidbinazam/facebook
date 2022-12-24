import { combineReducers } from "redux"
import authReducer from "./auth/authReducer";
import loadReducer from "./loading/loadReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    progress: loadReducer

})

export default rootReducer