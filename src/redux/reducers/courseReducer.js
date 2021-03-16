import { types } from '../types/types';

const initialState = {
    activeCourses: [],
    collegeCourses: [],
    courseCreated: null,
    checking: false,
    error: null,
    selectedCourse: null
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.courseStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.courseCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.courseClearError:
            return {
                ...state,
                error: false,
                checking: false
            }
        case types.courseGetActiveCoursesError:
        case types.courseGetCollegeCourseError:
        case types.courseCreateError:
            return {
                ...state,
                error: true,
                checking: false
            }
        case types.courseCreateOK:
            return {
                ...state,
                error: false,
                checking: false,
                courseCreated: action.payload
            }
        case types.courseGetCollegeCoursesOK:
            return {
                ...state,
                collegeCourses: action.payload,
                error: false,
                checking: false
            }
        case types.courseSelectCourse:
            return {
                ...state,
                error: false,
                checking: false,
                selectedCourse: action.payload
            }
        case types.courseGetAtiveCoursesOK:
            return {
                ...state,
                error: false,
                checking: false,
                activeCourses: action.payload
            }
        default:
            return state;
    }
}