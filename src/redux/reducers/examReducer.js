import { types } from '../types/types';

const initialState = {
    subjectExams: [],
    checking: false,
    error: null,
    selectedExam: null,
    examCreated: null
}

export const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.examStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.examCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.examCreateError:
        case types.examGetSubjectExamError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.examClearError:
            return {
                ...state,
                error: false
            }
        case types.examGetSubjectExamOK:
            return {
                ...state,
                error: false,
                checking: false,
                subjectExams: action.payload
            }
        case types.examCreateOK:
            return {
                ...state,
                error: false,
                checkig: false,
                examCreated: action.payload
            }
        default:
            return state;
    }
}