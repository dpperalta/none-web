import { types } from '../types/types';

const initialState = {
    citiesList: [],
    error: null,
    checking: true,
    selectedCity: null
}

export const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.cityCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.cityGetError:
            return {
                ...state,
                error: true
            }
        case types.cityGetOk:
            return {
                ...state,
                citiesList: action.payload,
                error: null,
                checking: false
            }
        default:
            return state;
    }
}