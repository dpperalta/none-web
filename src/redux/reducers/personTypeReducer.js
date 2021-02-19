import { types } from '../types/types';

const initialState = {
    personTypeList: [],
    error: null,
    checking: true,
    selectedPersonType: null
}

export const personTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.personTypeCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.personTypeGetError:
            return {
                ...state,
                error: true
            }
        case types.personTypeGetOK:
            return {
                ...state,
                personTypeList: action.payload,
                checking: false,
                error: null
            }
        default:
            return state;
    }
}

/*
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
*/