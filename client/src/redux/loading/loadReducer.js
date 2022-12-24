import initialState from "./initialState";
import { LOADING_END, LOADING_START } from "./types";


const loadReducer = ( state = initialState , { type, payload }) => {
    
    switch (type) {
        case LOADING_START:
            return 100

        case LOADING_END:
            return 0

        default:
            return state
    }
}

export default loadReducer