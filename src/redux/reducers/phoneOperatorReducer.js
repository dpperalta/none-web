import { types } from '../types/types';

const initialState = {
    operatorsList: [],
    error: null,
    checking: true,
    selectedOperator: null
}

export const phoneOperatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.operatorCheckinkgFinished:
            return {
                ...state,
                checking: false
            }
        case types.operatorGetError:
            return {
                ...state,
                error: true
            }
        case types.operatorClearError:
            return {
                ...state,
                error: null
            }
        case types.operatorGetOK:
            return {
                ...state,
                operatorsList: action.payload,
                checking: false,
                error: null
            }
        default:
            return state;
    }
}