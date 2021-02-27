import { types } from '../types/types';

const initialState = {
    courseTasks: [],
    checking: false,
    error: null,
    selectedTask: null,
    taskCreated: null
}

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.taskStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.taskCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.taskCreateError:
        case types.taskGetSubjectTaskError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.taskClearError:
            return {
                ...state,
                error: false
            }
        case types.taskGetSubjectTaskOK:
            return {
                ...state,
                error: false,
                checking: false,
                courseTasks: action.payload
            }
        case types.taskCreateOK:
            return {
                ...state,
                error: false,
                checkig: false,
                taskCreated: action.payload
            }
        default:
            return state;
    }
}