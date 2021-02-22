import { types } from '../types/types';

const initialState = {
    userCreated: null,
    checking: true,
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.userCreateError:
            return {
                ...state,
                error: true,
                checking: false
            }
        case types.userClearError:
            return {
                ...state,
                error: false
            }
        case types.userCreateOK:
            return {
                ...state,
                userCreated: action.payload,
                error: false,
                checking: false
            }
        default:
            return state;
    }
}