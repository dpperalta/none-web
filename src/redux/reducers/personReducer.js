import { types } from '../types/types';

const initialState = {
    authPerson: null,
    personCreated: null,
    checking: false,
    error: null
}

export const personReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.personStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.personGetPersonError:
        case types.personCreatingError:
            return {
                ...state,
                checking: false,
                error: true
            }
        case types.personClearError:
            return {
                ...state,
                error: false
            }
        case types.personCreatingOK:
            return {
                ...state,
                checking: false,
                error: false,
                personCreated: action.payload
            }
        case types.personGetPersonOK:
            return {
                ...state,
                authPerson: action.payload,
                error: false,
                checking: false
            }
        default:
            return state;
    }
}