import { types } from "../types/types";

const initialState = {
    authUser: false,
    checking: true,
    user: null,
    role: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.startAuth:
            return {
                ...state,
                authUser: true,
                checking: false,
            }
        case types.authSetRole:
            return {
                ...state,
                role: action.payload
            }
        case types.authCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.authStartLogin:
            return {
                ...state,
                checking: false,
                user: action.payload,
                authUser: true
            }
        case types.authLogout:
            return {
                cheking: false,
                user: null,
                authUser: false,
                role: null
            }
        default:
            return state;
    }
}