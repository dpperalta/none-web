import { types } from "../types/types";

const initialState = {
    authUser: false,
    checking: true,
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.startAuth:
            return {
                ...state,
                authUser: true
            }

        default:
            return state;
    }
}