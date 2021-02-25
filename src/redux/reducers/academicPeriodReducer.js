import { types } from '../types/types';

const initialState = {
    academicPeriodCreated: null,
    checking: false,
    error: null
}

export const academicPeriodReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.aperiodStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.aperiodCheckingFinished:
            return {
                ...state,
                checking: false
            }
        case types.aperiodCreateError:
            return {
                ...state,
                error: true,
                checking: false
            }
        case types.aperiodCleanError:
            return {
                ...state,
                error: false
            }
        case types.aperiodCreateOK:
            return {
                ...state,
                academicPeriodCreated: action.payload,
                error: false,
                checking: false
            }
        default: 
            return state;
    }
}