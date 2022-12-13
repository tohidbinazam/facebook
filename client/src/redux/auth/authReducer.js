import initialState from "./initialState";
import { DATA_ADD, LOGGED_IN, LOGGED_OUT, REASON_ADD } from "./types";


const authReducer = ( state = initialState , { type, payload }) => {
    
    switch (type) {
        case DATA_ADD:
            return {
                    ...state,
                    user: payload.user,
                    reason: payload.reason,
                    isLoggedIn: payload.reason === 'login' ? true : false,
                }
        case REASON_ADD:
            return {
                    ...state,
                    reason: payload
                }
        case LOGGED_IN:
            return {
                    ...initialState,
                    isLoggedIn: true,
                    user: payload
                }

        case LOGGED_OUT:
            return { isLoggedIn: false }

        default:
            return state
    }
}

export default authReducer