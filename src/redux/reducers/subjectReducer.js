import { types } from '../types/types';

const initialState = {
    courseSubjects: [],
    checking: false,
    error: null,
    selectedSubject: null,
    subjectCreated: null
}

export const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.subjectStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.subjectCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.subjectCreateError:
        case types.subjectGetCourseSubjectError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.subjectClearError:
            return {
                ...state,
                error: false
            }
        case types.subjectGetCourseSubjectOK:
            return {
                ...state,
                error: false,
                checking: false,
                courseSubjects: action.payload
            }
        case types.subjectCreateOK:
            return {
                ...state,
                error: false,
                checkig: false,
                subjectCreated: action.payload
            }
        default:
            return state;
    }
}