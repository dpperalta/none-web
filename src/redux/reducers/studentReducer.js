import { types } from '../types/types';

const initialState = {
    checking: false,
    error: null,
    studentCreated: null,
    studentTeacher: []
}

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.studentStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.studentCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.studentGetTeacherStudentError:
        case types.studentCreateError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.studentCleanError:
            return {
                ...state,
                error: false
            }
        case types.studentCreateOK:
            return {
                ...state,
                error: false,
                checking: false,
                studentCreated: action.payload
            }
        case types.studentGetTeacherStudentOK:
            return {
                ...state,
                error: false,
                checking: false,
                studentTeacher: action.payload
            }
        default:
            return state;
    }
}