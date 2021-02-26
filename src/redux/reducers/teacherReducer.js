import { types } from '../types/types';

const initialState = {
    collegeTeachers: [],
    checking: false,
    error: null,
    selectedTeacher: null,
}

export const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.teacherStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.teacherCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.teacherGetCollegeTeacherError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.teacherCleanError:
            return {
                ...state,
                error: false
            }
        case types.teacherGetCollegeTeacherOK:
            return {
                ...state,
                error: false,
                checking: false,
                collegeTeachers: action.payload
            }
        default:
            return state;
    }
}