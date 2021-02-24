import { types } from '../types/types';

const initialState = {
    collegeCreated: null,
    checking: false,
    error: null
}

export const collegeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.collegeStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.collegeCreateError:
            return {
                ...state,
                error: true,
                checking: false
            }
        case types.collegeCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.collegeCreateOK:
            return {
                ...state,
                collegeCreated: action.payload,
                checking: false,
                error: null
            }
        default: 
            return state;
    }
}
/*
export const personReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.personStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.personCreatingError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.personClearError:
            return {
                ...state,
                error: false
            }
        case types.personCreatingOK:
            return {
                ...state,
                checking: false,
                error: false,
                personCreated: action.payload
            }
        default:
            return state;
    }
}
*/