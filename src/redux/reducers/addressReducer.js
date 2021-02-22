import { types } from '../types/types';

const initialState = {
    addressCreated: null,
    checking: true,
    error: null
}

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.addressCreateError:
            return {
                ...state,
                error: true,
                checking: false
            }
        case types.addressClearError:
            return {
                ...state,
                error: false
            }
        case types.addressCreateOK:
            return {
                ...state,
                addressCreated: action.payload,
                error: false,
                checking: false
            }
        default:
            return state;
    }
}