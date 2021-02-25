import { types } from '../types/types';

const initialState = {
    collegeCreated: null,
    checking: false,
    error: null,
    usersCollege: null
}

export const collegeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.collegeStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.collegeGetCollegeError:
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
        case types.collegeGetCollegeOK:
            return {
                ...state,
                usersCollege: action.payload,
                checking: false,
                error: null
            }
        default:
            return state;
    }
}