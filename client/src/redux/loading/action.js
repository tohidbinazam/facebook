import { LOADING_END, LOADING_START } from "./types";


// loading Start
export const loadStart = () => ({
    type: LOADING_START
})

// loading End
export const loadEnd = () => ({
    type: LOADING_END
})