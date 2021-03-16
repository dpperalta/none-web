import { types } from '../types/types';

const initialState = {
    authPerson: null,
    checking: false,
    error: null,
    personCreated: null,
    personStudents: []
}

export const personReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.personStartChecking:
            return {
                ...state,
                checking: true
            }
        case types.personGetPersonStudentError:
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
        case types.personGetPersonStudenOK:
            return {
                ...state,
                personStudents: action.payload,
                error: false,
                checking: false
            }
        case types.personRemovePersonStudent:
            return {
                ...state,
                personStudents: state.personStudents.filter(person => person.idpersona !== action.payload)
            }
        default:
            return state;
    }
}