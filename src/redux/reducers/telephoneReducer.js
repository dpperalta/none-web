import { types } from '../types/types';

const initialState = {
    telephoneCreated: null,
    checking: true,
    error: null
}

export const telephoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.phoneCreateError:
            return {
                ...state,
                error: true,
                checking: false
            }
        case types.phoneClearError:
            return {
                ...state,
                error: false
            }
        case types.phoneCreateOK:
            return {
                ...state,
                telephoneCreated: action.payload,
                error: false,
                checking: false
            }
        default:
            return state;
    }
}